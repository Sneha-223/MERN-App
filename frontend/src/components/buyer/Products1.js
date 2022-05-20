import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Fuse from "fuse.js";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import jwt_decode from "jwt-decode";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import img from "./../../Images/logo.png";
import products_image from "../../Images/products.svg"
import ButtonAddRemoveItem from "./ButtonAddRemoveItem/index"

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import './DisplayProduct.css';
import ButtonCartCount from "./ButtonCartCount/index";

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '12rem',
    height: '30rem',
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function toISOStringLocal(d) {
    function z(n) { return (n < 10 ? '0' : '') + n }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' +
        z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
        z(d.getMinutes()) + ':' + z(d.getSeconds())

}

const DisplayProduct = () => {
    const Modal = () => (
        <Popup trigger={<button className="button"> Open Modal </button>} modal>
            <span> Modal content </span>
        </Popup>
    );
    const [email, setEmail] = useState("")
    const [user_id, setUserId] = useState(0);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [deliver, setDeliver] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [image, setImage] = useState("");
    const [fileName, setFileName] = useState("");
    const [URLN, setURL] = useState("");
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(false);
    const [totalProducts, setTotalProducts] = useState([])
    const closeModal = () => setOpen(false)
    const [searchBarVal, setSearchBarVal] = useState("");
    const [categories, setCategories] = useState([]);
    const [product_dict, setProductDict] = useState({});
    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const [sortPrice, setSortPrice] = useState(false)
    const printSort = () => {
        if (sortPrice === true) {
            setProducts([...products.sort((a, b) => (a.price > b.price ? 1 : -1))])
        } else if (sortPrice === false) {
            setProducts([...products.sort((a, b) => (a.price < b.price ? 1 : -1))])
        }

    }

    async function onSearch(value) {

        setSearchBarVal(value)

        var selected_products = []
        var results = [];
        const fuse = new Fuse(
            totalProducts, {
            keys: ['name']
        }
        )
        if (value != "") {
            results = fuse.search(value)
            selected_products = results.map(result => result.item);
        }
        else {
            selected_products = totalProducts;
        }

        setProducts(selected_products)
    }

    async function onSelect(value) {

        var selected_products = []
        const fuse = new Fuse(
            totalProducts, {
            keys: ['name']
        }
        )
        if (searchBarVal !== "") {
            selected_products = fuse.search(searchBarVal).map(item => item.item);
        }
        else {
            selected_products = totalProducts;
        }
        var x = [];
        if (value !== 0) {
            for (var i = 0; i < selected_products.length; i++) {

                if (value == 0) {
                    x.push(selected_products[i])
                }
                if (selected_products[i].categoryID == value) {
                    x.push(selected_products[i])
                }

            }
        }
        // if (value == "all")
        // {
        //     x = totalProducts;
        // }

        selected_products = x;
        x = []
        setProducts(selected_products)

    }

    async function onSelectPrice(value) {

        if (value === true) {
            setProducts([...products.sort((a, b) => (a.price > b.price ? 1 : -1))])
        } else if (value === false) {
            setProducts([...products.sort((a, b) => (a.price < b.price ? 1 : -1))])
        }

    }

    let userID = localStorage.getItem("USER_ID");
  const [user, setUser] = useState("");

  useEffect(() => {

    userID = localStorage.getItem("USER_ID")

    axios.get('http://localhost:4000/user/' + userID)
      .then(response => {
        console.log(response.data)
        setUser(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        localStorage.setItem('USER_ID', 0)
      })

    axios
      .get("http://localhost:4000/product")
      .then((response) => {
        setProductDict(response.data);
        setProducts(response.data);
        setTotalProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



    // useEffect(() => {
    //     function abc() {
    //         axios.post("http://localhost:4000/displayproducts").then((response) => {
    //             var x = response.data.users; var y = {};
    //             for (var i = 0; i < x.length; i++) {
    //                 y[x[i].id] = 0;
    //             }

    //             setProductDict(y);
    //             setProducts(response.data.users)
    //             setTotalProducts(response.data.users)
    //         })
    //         var x = localStorage.getItem('token');
    //         const user = jwt_decode(x);
    //         setEmail(user.email)

    //         axios.post("http://localhost:4000/getByEmail", { email: user.email }).then((response) => {
    //             var x = response.data.users;

    //             setUserId(x.id)
    //         })
    //         axios.post("http://localhost:4000/getallcategories").then((response) => {
    //             var x = []; x = response.data.users;
    //             x.push({ createdAt: "2020-04-30T18:30:00.000Z", description: "Dummy Value", id: 0, type: "All Products", updatedAt: "2020-04-30T18:30:00.000Z" })
    //             setCategories(response.data.users)
    //         })

    //     }
    //     abc();
    // }, [])

    // async function displayFullProduct(product) {
    //     await axios.post("http://localhost:4000/getimage", { id: product.imageID }).then((response) => {
    //         setImage(response.data.users.url)
    //     })
    //     await axios.post("http://localhost:4000/getitemcategory", { id: product.categoryID }).then((response) => {
    //         // console.log(response.data.users.type)
    //         setCategory(response.data.users.type)
    //     })
    //     return (<div>


    //     </div>
    //     );
    // }
    const displaySearchBar = () => {
        return (<div>
            <TextField
                id="standard-basic"
                label="Search"
                fullWidth={true}
                defaultValue=""
                onChange={(event) => onSearch(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>);
    }
    // async function onSubmit() {
    //     for (const [key, val] of Object.entries(product_dict)) {
    //         if (val === 0) {
    //             continue;
    //         }
    //         console.log(val);
    //         // console.log(user_id)
    //         await axios.post("http://localhost:4000/addproductincart", { user_id: user_id, product: key, quantity: val }).then((response) => {
    //             console.log(response.data);
    //         })
    //     }


    // }
    const displayProducts = (product, index) => {
        try {
            return (

                <div className='item'>
                    <img src={img} alt="item"></img>
                    <div className='item-head_desc'>
                        <p className='head_desc-name'>{product.name}</p>
                        <p className='head_desc-info'>
                            <small>{product.description}</small>
                        </p>
                    </div>
                    <div className='item-foot_desc'>
                        <span className='foot_desc-price'>₹{product.price}</span>
                        <div>
                            <Link to={"/orders/" + product._id}>Buy</Link>
                        </div>

                    </div>

                </div>
            );
        }
        catch (error) {
            console.log(error)
        }
    }
    return (

        <div>

            <div className="home-page-container">


                <div className="home-page-element">

                    <img src={products_image} className="home-img" alt="home image" />

                </div>

                <div className="home-page-element">
                    <h1>Shop our selection of <strong className="text-primary">Products</strong></h1>

                </div>

            </div>

            <div className="products-container">

                <div className="products-element">
                    {/* <Grid container direction={'column'} spacing={2}> */}
                    <div className="filter-element">
                        {displaySearchBar()}
                    </div>

                    <div><ButtonCartCount /></div>


                    <div className="filter-element">

                        <p>PRODUCT CATEGORY</p>

                        <div >
                            {categories.map((todo, index) => {
                                return <MenuItem className="category-text" onClick={e => onSelect(e.target.value)} key={todo.type} value={todo.id}>{todo.type}</MenuItem>
                            })}
                            {/* <MenuItem className="category-text" onClick={e => onSelect("all")}> </MenuItem> */}
                        </div>

                    </div>

                    <div className="filter-element">

                        <p>PRICE</p>

                        <div>
                            <div
                                value={sortPrice}
                            >
                                <MenuItem onClick={e => onSelectPrice(true)} >Ascending</MenuItem>
                                <MenuItem onClick={e => onSelectPrice(false)}>Descending</MenuItem>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="products-element">
                    <main>

                        {
                            products.map((product, idx) => (
                                <div>
                                    {displayProducts(product, idx)}
                                </div>
                            ))
                        }
                    </main>
                    {/* <Grid item xs>
                        <Item>
                            <Button onClick={() => onSubmit()}>
                                Submit
                            </Button>
                        </Item>
                    </Grid> */}
                </div>

            </div>
        </div>
    )
}
export default DisplayProduct;
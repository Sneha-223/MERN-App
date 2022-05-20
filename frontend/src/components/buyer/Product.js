import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useContext, useEffect } from 'react';

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
import { Link } from 'react-router-dom';

import img from "./../../Images/logo.png";
import products_image from "../../Images/products.svg";

import 'bootstrap/dist/css/bootstrap.css';

import './Product.css';

const DisplayProduct = () => {
    
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
    // const printSort = () => {
    //     if (sortPrice === true) {
    //         setProducts([...products.sort((a, b) => (a.price > b.price ? 1 : -1))])
    //     } else if (sortPrice === false) {
    //         setProducts([...products.sort((a, b) => (a.price < b.price ? 1 : -1))])
    //     }

    // }

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

        console.log("selected category: ")
        console.log(value);

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
        if (value !== "") {
            for (var i = 0; i < selected_products.length; i++) {

                if (value == "" || value == "All") {
                    x.push(selected_products[i])
                }
                if (selected_products[i].type == value) {
                    x.push(selected_products[i])
                }

            }
        }

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
        setCategories(['Beauty', 'Tech', 'Fashion', 'Home', 'Stationery']);
        //setCategories(response.data.type);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


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
                    
                    <div className="btn btn-outline-primary">
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

        <div className="products-container">

          <div className="filter">
            {/* <Grid container direction={'column'} spacing={2}> */}

            <div className="filter-element">
                {displaySearchBar()}
            </div>


            <div className="filter-element">

                <p>PRODUCT CATEGORY</p>

                <div >
                  <MenuItem onClick={e => onSelect("All")} >All Products</MenuItem>
                  
                  {categories.map((item, index) => {
                    return <MenuItem className="category-text" onClick={e => onSelect(item)} >{item}</MenuItem>
                  })}

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

          <div className="products">
            <main>
              {
                products.map((product, idx) => (
                    <div>
                        {displayProducts(product, idx)}
                    </div>
                ))
              }
            </main>

          </div>

        </div>

      </div>
    )
}
export default DisplayProduct;



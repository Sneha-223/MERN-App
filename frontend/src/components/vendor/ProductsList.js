import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import img from "./../../Images/logo.png";


const ProductsList = (props) => {

    let userID = localStorage.getItem("USER_ID");
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        userID = localStorage.getItem("USER_ID")

        axios.get('http://localhost:4000/user/' + userID)
            .then(response => {
                // console.log(response.data)
                setUser(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
                localStorage.setItem('USER_ID', 0)
            })

    }, []);

    axios
        .get("http://localhost:4000/product/shop/" + user.name)
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    const onSubmit = () => {
        navigate("/products/add");
    }

    const deleteProduct = (id) => {
        axios.delete('http://localhost:4000/product/' + id)
            .then(response => { console.log(response.data) });

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

                    <div>{product.tags.map(entry =>
                        <small>{entry} </small>
                        )}
                    </div>
                </div>
                
                <div className='item-foot_desc'>
                    <span className='foot_desc-price'>₹{product.price}</span>
                    {/* <Link to={"/edit/" + product._id}>edit</Link> */}
                </div>
                    
                <div className='item-foot_desc'>
                    <div className="btn btn-outline-primary"><Link to={"/edit/" + product._id}>edit</Link></div> <a href="#" className="btn btn-outline-primary" onClick={() => { deleteProduct(product._id) }}>delete</a>
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

            <Grid container align={"center"} spacing={2}>

                {/* <Grid item xs={12}>
                    <h2>DASHBOARD</h2>
                </Grid> */}

                <Grid item xs={12}>
                    <Button variant="outlined" onClick={onSubmit}>
                        Add New Product
                    </Button>
                </Grid>
            </Grid>

            <Grid container>

                <Grid item xs={12}>

                </Grid>

                <main>
                {
                    products.map((product, idx) => (
                        <div>
                            {displayProducts(product, idx)}
                        </div>
                    ))
                }
                </main>

                
            </Grid>
        </div>
    );
};

export default ProductsList;

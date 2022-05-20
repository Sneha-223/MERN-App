import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import add_product_image from "../../Images/add_product.svg"

import '../common/Login.css';


const Products = (props) => {

  let userID = localStorage.getItem("USER_ID");
  const [user, setUser] = useState("")

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
  }, [])



  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [shop, setShop] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  // const onChangeTags = (event) => {
  //   setTags(event.target.value);
  // };

  const onSubmitTag = () => {
    setTags([...tags, `Entry${tags.length}`]);
  };


  const resetInputs = () => {
    setName("");
    setPrice("");
    setRating("");
    setType("Beauty");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      name: name,
      price: price,
      rating: rating,
      type: type,
      shop: user.name,
      tags: tags,
    };

    axios
      .post("http://localhost:4000/product/products", newProduct)
      .then((response) => {
        alert("Added\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (

    <div className="login-page-container">
      <div className="login-page-element">

        <img src={add_product_image} className="login-img" alt="login image" />

      </div>

      <div className="login-page-element">

        <Container component="main" maxWidth="xs">

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              Add Product
            </Typography>

            <Box component="form" /*noValidate onSubmit={Submit}*/ sx={{ mt: 3 }}>
              <Grid container align={"center"} spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={onChangePrice}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Rating"
                    variant="outlined"
                    value={rating}
                    onChange={onChangeRating}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField select label="Select" sx={{ minWidth: 264 }}
                    fullWidth
                    value={type}
                    label="Product-Type"
                    onChange={onChangeType}
                  >
                    <MenuItem value={"Beauty"}>Beauty</MenuItem>
                    <MenuItem value={"Tech"}>Tech</MenuItem>
                    <MenuItem value={"Fashion"}>Fashion</MenuItem>
                    <MenuItem value={"Home"}>Home</MenuItem>
                    <MenuItem value={"Stationery"}>Stationery</MenuItem>
                    
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter tags"
                    variant="outlined"
                    value={tag}
                    onChange={(event) => {
                      setTag(event.target.value);
                      console.log("tag: " + event.target.value);

                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined"
                    onClick={() => {
                      setTags([...tags, tag]);
                      // console.log("TAGS: " + tags);
                    }}
                  >
                    Add Tag
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" onClick={onSubmit}>
                    Add Product
                  </Button>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Container>

      </div>


    </div >


  );
};

export default Products;

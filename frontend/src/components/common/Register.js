import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import 'bootstrap/dist/css/bootstrap.css';

import register_image from "../../Images/register.svg"

import './Login.css';

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  // const [batch, setBatch] = useState("");
  const [wallet, setWallet] = useState("");

  const [manager, setManager] = useState("");
  const [shop, setShopName] = useState("");
  // const [OpenTime, setOpenTime] = useState("");
  // const [CloseTime, setCloseTime] = useState("");

  const [type, setType] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  // const onChangeBatch = (event) => {
  //   setBatch(event.target.value);
  // };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const onChangeManager = (event) => {
    setManager(event.target.value);
  };


  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDate(null);
    setNumber("");
    setAge("");
    setManager("");
    setShopName("");
    setWallet("");
    setType("Buyer");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      date: Date.now(),
      number: number,
      age: age,
      manager: manager,
      // batch: batch,
      shop: shop,
      // OpenTime: OpenTime,
      // CloseTime: CloseTime,
      wallet: 0,
      type: type,
    };

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (

    <div className="login-page-container">

      <div className="login-page-element">

        <img src={register_image} className="login-img" alt="login image" />

      </div>

      <div className="login-page-element">

        <Container component="main" maxWidth="xs">

          {/* <CssBaseline /> */}
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

              <Typography component="h1" variant="h5" sx={{alignItems: 'center'}}>
                Sign Up
              </Typography>

            <Box component="form" sx={{ mt: 3 }}>
            
            <Grid container spacing={1}>

          
              <Grid item xs={12} >

              <TextField select label="Select" sx={{ minWidth: 264 }}
                fullWidth
                value={type}
                label="User-Type"
                onChange={onChangeType}
              >
                
                <MenuItem value={"Buyer"}>Buyer</MenuItem>
                <MenuItem value={"Vendor"}>Vendor</MenuItem>

              </TextField>

              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  
                  variant="outlined"

                  id="standard-password-input"
                  label="Password"
                  type="password"

                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number"
                  variant="outlined"
                  value={number}
                  onChange={onChangeNumber}
                />
              </Grid>

              {type == "Buyer" &&
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                  />
                </Grid>
              }
              {type == "Buyer" &&
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Age"
                    variant="outlined"
                    value={age}
                    onChange={onChangeAge}
                  />
                </Grid>
              }

              {type == "Vendor" &&
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Manager"
                    variant="outlined"
                    value={manager}
                    onChange={onChangeManager}
                  />
                </Grid>
              }
              {type == "Vendor" &&
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Shop-Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                  />
                </Grid>
              }

              <Grid item xs={12}>
                <Button variant="outlined" type="submit" fullWidth sx={{ mt: 3, mb: 2 }} onClick={onSubmit}>
                  Register
                </Button>
              </Grid>
          

            </Grid>
            </Box>

          </Box>
        </Container>

      </div>

    </div>
  );
};

export default Register;

import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";

import navbar_logo from '../../Images/profile.png';

import './Profile.css';

function Profile() {

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("../edit");
  }

  let userID = ""
  const [user, setUser] = useState("")
  useEffect(() => {
    userID = localStorage.getItem("USER_ID")

    axios.get('http://localhost:4000/user/' + userID)
      .then(response => {
        // console.log("SUCCESS")
        // console.log(response.data)
        setUser(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        localStorage.setItem('USER_ID', 0)
      })
  }, [])

  const [quantity, setQuantity] = useState("");

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
    // console.log("qty: ");
    // console.log(quantity);
  };

  const addMoney = (event) => {
    event.preventDefault();

    const newUser = {
      wallet: parseInt(quantity) + parseInt(user.wallet),
    };

    userID = localStorage.getItem("USER_ID")

    axios
      .post("http://localhost:4000/user/wallet/" + userID, newUser)
      .then((response) => {
        alert("Edited\t" + response.data);
        console.log(response.data);
      });
  };

  return (

    <div className="profile">

      {/* <Grid spacing={2}> */}

      <Grid item xs={12}>
        <h2>PROFILE</h2>
      </Grid>

      <Grid item xs={12} align={"center"}>
        <div className="imgContainer">

          <img src={navbar_logo} alt="logo" />
          {/* {loading ? <>Loading</> : <img src={require("../../uploads/" + url)} className="imgContainer" />} */}

        </div>
        <br></br>
        <br></br>
      </Grid>

      {/* </Grid> */}

      <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">

          <TableBody>

            <TableRow sx={{
              [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
            }}>
              <TableCell style={{ fontWeight: "bold" }}>Name:</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>

            <TableRow sx={{
              [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
            }}>
              <TableCell style={{ fontWeight: "bold" }}>Email:</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>

            <TableRow sx={{
              [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
            }}>
              <TableCell style={{ fontWeight: "bold" }}>Phone number:</TableCell>
              <TableCell >{user.number}</TableCell>
            </TableRow>

            {/* <TableRow sx={{
              [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
            }}>
              <TableCell style={{ fontWeight: "bold" }}>Type:</TableCell>
              <TableCell >{user.type}</TableCell>
            </TableRow> */}

            {user.type == "Buyer" &&

              <TableRow sx={{
                [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
              }}>
                <TableCell style={{ fontWeight: "bold" }}>Wallet:</TableCell>
                <TableCell >{user.wallet}</TableCell>
              </TableRow>

            }

            {user.type == "Buyer" &&

              <TableRow sx={{
                [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
              }}>
                <TableCell>
                  <TextField
                    label="Enter amount"
                    variant="outlined"
                    value={quantity}
                    onChange={onChangeQuantity}
                  />
                </TableCell>
                <TableCell>
                <Button variant="outlined" onClick={addMoney}>
                  Add money
                </Button>
                </TableCell>
              </TableRow>

            }


          </TableBody>
        </Table>
      </TableContainer>
      
      <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={onSubmit}>
          Edit Details
        </Button>
      </Grid>
      </Grid>

    </div>

    // <Grid container align={"center"} spacing={2}>

    //   <Grid item xs={12}>
    //     <h2>PROFILE DETAILS</h2>
    //   </Grid>

    //   <Grid item xs={12}>
    //     Name: {user.name}
    //   </Grid>
    //   <Grid item xs={12}>
    //     Email: {user.email}
    //   </Grid>
    //   <Grid item xs={12}>
    //     Phone number: {user.number}
    //   </Grid>
    //   <Grid item xs={12}>
    //     User type: {user.type}
    //   </Grid>

    //   <Grid item xs={12}>
    //     <Button variant="contained" onClick={onSubmit}>
    //       Edit Details
    //     </Button>
    //   </Grid>
    // </Grid>

  )
}
export default Profile

import React from 'react'
import Grid from "@mui/material/Grid";

import 'bootstrap/dist/css/bootstrap.css';

function Logout(props) {
    localStorage.removeItem('USER_ID')      //reseting user
    localStorage.setItem('USER_ID', "")
    return (
        <Grid container align={"center"} spacing={2}>

            <Grid item xs={12}>
                <h2>Logged out</h2>
                {/* <a href="/login"><p>Login page</p></a> */}

                <a href="/" className="btn btn-outline-primary">Home Page</a>
            </Grid>
        </Grid>
    )
}
export default Logout
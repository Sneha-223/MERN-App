import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import login_image from "../../Images/login.svg"

import './Login.css';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        var user_id = 0;

        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((response) => {
                user_id = response.data;
                alert("Logged in");
                console.log(response.data);
                localStorage.setItem('USER_ID', user_id)
                window.location.replace("/home")
            })
            //.catch(error => console.error(error))
            .catch(error => {
                alert("Invalid email/password");
                console.log(error.response.data)
                localStorage.setItem('USER_ID', 0)
            })

        resetInputs();
    };

    return (

        <div className="login-page-container">


            <div className="login-page-element">

                <img src={login_image} className="login-img" alt="login image" />

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
                            Sign In
                        </Typography>

                        <Box component="form" sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        onChange={onChangeEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"

                                        id="standard-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        value={password}
                                        onChange={onChangePassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" type="submit" fullWidth sx={{ mt: 3, mb: 2 }} onClick={onSubmit}>
                                        Login
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
export default Login;
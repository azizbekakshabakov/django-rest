// import { AppBarComponent } from "../mui/app-bar";
import { SideBar } from "./SideBar";
import { NavBar } from './NavBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Typography } from "@mui/material";
import { useDB } from './db-hook';
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const Signup = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [send, setSend] = useState(false);
    const [result, setResult] = useState();
    const [error, setError] = useState();

    // if (error !== undefined) console.log(error);

    if (result !== undefined) 
        window.location.replace("/login");

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    
    const getAllItems = () => {
        axios
            .post(
                "http://127.0.0.1:8000/api/v1/auth/users/",
                {
                    "username": login,
                    "email": email,
                    "password": password
                }
            )
            .then((res) => res.data)
            .then((res) => {
                setResult(res);
                // console.log(res);
            })
            .catch((err) => {
                setError(JSON.parse(err.request.response));
            });
    };

    return (
        <>
        <CssBaseline />
                
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <NavBar />
            {/* Users list */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="sm" align="center">

                    <Typography gutterBottom variant="h5" component="div" align="center">Register</Typography>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="standard-basic" label="Login" variant="standard" onChange={handleLoginChange} />
                    </FormControl>
                    { error !== undefined
                    ?
                        error.username !== undefined 
                        ?
                            error.username.map((message, index) => (
                                <Alert severity="error" key={index}>
                                    <AlertTitle>{message}</AlertTitle>
                                </Alert>
                            ))
                        :
                        ''
                    :
                        ''
                    }
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="standard-basic" label="Email" variant="standard" onChange={handleEmailChange} />
                    </FormControl>
                    { error !== undefined
                    ?
                        error.email !== undefined 
                        ?
                            error.email.map((message, index) => (
                                <Alert severity="error" key={index}>
                                    <AlertTitle>{message}</AlertTitle>
                                </Alert>
                            ))
                        :
                        ''
                    :
                        ''
                    }
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="standard-basic" label="Password" variant="standard" type="password" onChange={handlePasswordChange} />
                    </FormControl>
                    { error !== undefined
                    ?
                        error.password !== undefined 
                        ?
                            error.password.map((message, index) => (
                                <Alert severity="error" key={index}>
                                    <AlertTitle>{message}</AlertTitle>
                                </Alert>
                            ))
                        :
                        ''
                    :
                        ''
                    }
                    <Button variant="contained" size="large" sx={{marginTop: '1rem'}} onClick={getAllItems}>
                        Submit
                    </Button>

                </Container>
            </Box>
        </Box>
        </>
    );
}
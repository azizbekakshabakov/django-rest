import { NavBar } from './NavBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';

export const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState();
    const [error, setError] = useState();

    // if (error !== undefined) console.log(error);

    if (result !== undefined) {
        localStorage.setItem("refreshToken", result.refresh);
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("username", login);

        axios
            .get(
                `http://127.0.0.1:8000/api/v1/auth/users/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            )
            .then((res) => res.data)
            .then((res) => {
                localStorage.setItem("id", res.results[0].id);
                // console.log(res);
                window.location.replace("/cabinet");
            })
            .catch((err) => {
                // setError(err.response.data.detail);
                console.log(err);
            });
    }

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    
    const getAllItems = () => {
        axios
            .post(
                "http://127.0.0.1:8000/api/v1/token/",
                {
                    "username": login,
                    "password": password
                }
            )
            .then((res) => res.data)
            .then((res) => {
                setResult(res);
                console.log(res);
            })
            .catch((err) => {
                setError(err.response.data.detail);
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

                    <Typography gutterBottom variant="h5" component="div" align="center">Login</Typography>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="standard-basic" label="Login" variant="standard" onChange={handleLoginChange} />
                    </FormControl>
                    {/* { error !== undefined
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
                    } */}
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField id="standard-basic" label="Password" variant="standard" type="password" onChange={handlePasswordChange} />
                    </FormControl>
                    {/* { error !== undefined
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
                    } */}
                    <Button variant="contained" size="large" sx={{marginTop: '1rem'}} onClick={getAllItems}>
                        Submit
                    </Button>

                </Container>
            </Box>
        </Box>
        </>
    );
}
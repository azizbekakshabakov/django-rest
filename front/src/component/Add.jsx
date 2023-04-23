import { SideBar } from "./SideBar";
import { NavBar } from './NavBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDB } from './db-hook';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import axios from "axios";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { v4 as uuidv4 } from 'uuid';

function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}
  
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export const Add = () => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [videos, setVideos] = React.useState([]);
    const [index, setIndex] = React.useState(uuidv4());
    const [slug, setSlug] = React.useState(uuidv4());
    const [name, setName] = React.useState("");

    const { result, error } = useDB(`http://127.0.0.1:8000/api/v1/video/`);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const addVideo = (videoId) => {
        let verified = false;

        let formData = new FormData();
        let videofile = document.querySelector('#video');
        let previewfile = document.querySelector('#preview');
        formData.append("video", videofile.files[0]);
        formData.append("preview", previewfile.files[0]);
        formData.append("index", index);
        formData.append("slug", slug);
        formData.append("name", name);
        formData.append("user", localStorage.getItem("id"));

        axios
            .post(
                `http://127.0.0.1:8000/api/v1/token/verify/`,
                {
                    token: localStorage.getItem("accessToken")
                }
            )
            .then((res) => res.data)
            .then((res) => {
                verified = true;
            })
            .catch((err) => {
                // setError(err.response.data.detail);
            });

        if (verified !== true) {
            axios
                .post(
                    `http://127.0.0.1:8000/api/v1/token/refresh/`,
                    {
                        refresh: localStorage.getItem("refreshToken")
                    }
                )
                .then((res) => res.data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.access);
                })
                .catch((err) => {
                    // setError(err.response.data.detail);
                });
        }
        
        axios
            .post(
                `http://127.0.0.1:8000/api/v1/video/`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            )
            .then((res) => res.data)
            .then((res) => {
                // console.log(res);
                window.location.replace("/cabinet");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (result === undefined) console.log('load');
    else {
        console.log(result);
    }

    if (result === undefined) return (
        <></>
    );

    return (
        <>
        {/* <AppBarComponent/> */}
        <CssBaseline />
        {/* <Grow in={true}> */}
                
                
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavBar />
                {/* Users list */}
                {/* <SideBar />  */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Container maxWidth="lg">

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <TextField id="standard-basic" label="Name" variant="standard" onChange={handleNameChange} />
                        </FormControl>
                        {/* <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <TextField id="standard-basic" label="Login" variant="standard" onChange={handleLoginChange} />
                        </FormControl> */}
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload video
                            <input
                                type="file"
                                hidden
                                id="video"
                            />
                        </Button>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload preview
                            <input
                                type="file"
                                hidden
                                id="preview"
                            />
                        </Button>

                        <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={addVideo}>Add</Button>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
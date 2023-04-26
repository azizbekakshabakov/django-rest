import { NavBar } from './NavBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDB } from './db-hook';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import axios from "axios";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { Error } from "./Error";

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

    if (localStorage.getItem("refreshToken") === null) return <Error/>;

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
        formData.append("user", Number(localStorage.getItem("id")));

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
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Container maxWidth="lg">

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <TextField id="standard-basic" label="Name" variant="standard" onChange={handleNameChange} />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="standard">
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
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="standard">
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
                        </FormControl>

                        <Typography align="center">
                            <Button variant="contained" sx={{ mt: 4, mb: 2, paddingX: "4rem" }} onClick={addVideo}>Add</Button>
                        </Typography>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
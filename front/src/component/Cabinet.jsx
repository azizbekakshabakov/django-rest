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

export const Cabinet = () => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [videos, setVideos] = React.useState([]);

    const { result, error } = useDB(`http://127.0.0.1:8000/api/v1/video/`);

    const deleteVideo = (videoId) => {
        let verified = false;

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
            .delete(
                `http://127.0.0.1:8000/api/v1/video/${videoId}/`,
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
                // console.log(err);
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
                <SideBar /> 
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Container maxWidth="lg">

                        <Grid item xs={12} md={6}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                Avatar with text and icon
                            </Typography>
                            <Demo>
                                <List dense={dense}>
                                { result.results.map((video, index) => {
                                        if (video.user_obj.username === localStorage.getItem("username")) {
                                            return (
                                                <ListItem
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteVideo(video.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                                key={index}
                                                >
                                                    <ListItemAvatar sx={{marginRight:"1rem"}}>
                                                        {/* <Avatar> */}
                                                            {/* <FolderIcon /> */}
                                                            <img src={video.preview} height="90px" width="160px" />
                                                        {/* </Avatar> */}
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={video.name}
                                                        secondary={video.user_obj.username}
                                                    />
                                                </ListItem>
                                            );
                                        }
                                        return "";
                                    })
                                }
                                </List>
                            </Demo>
                        </Grid>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
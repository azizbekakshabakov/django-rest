// import { AppBarComponent } from "../mui/app-bar";
import { SideBar } from "./SideBar";
import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import Grow from '@mui/material/Grow';
import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDB } from './db-hook';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ReactPlayer from 'react-player'

// const drawerWidth = 240;

export const Video = () => {
    
    const { result, error } = useDB(`http://127.0.0.1:8000/api/v1/video/${useParams()['videoid']}`);

    if (result === undefined) console.log('load');
    else console.log(result);
    
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
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Clipped drawer
                    </Typography>
                    </Toolbar>
                </AppBar>
                {/* Users list */}
                <SideBar /> 
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Container maxWidth="lg">

                        <ReactPlayer width={'100%'} height={'650px'} playing controls url={`${result.video}`} light={`${result.preview}`} />
                        <Typography variant="h4" sx={{ paddingTop: '1rem' }} gutterBottom>{result.name}</Typography>
                        <Typography variant="h4" sx={{ paddingTop: '0.2rem' }} gutterBottom>Author: {result.user.username}</Typography>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
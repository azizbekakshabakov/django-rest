// import { AppBarComponent } from "../mui/app-bar";
import { SideBar } from "./SideBar";
import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import Grow from '@mui/material/Grow';
import * as React from 'react';
import Box from '@mui/material/Box';
import { NavBar } from './NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDB } from './db-hook';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ReactPlayer from 'react-player';

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
                <NavBar />
                <SideBar /> 
                {/* Users list */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Container maxWidth="lg">

                        <ReactPlayer width={'100%'} height={'650px'} playing controls url={`${result.video}`} light={`${result.preview}`} />
                        <Typography variant="h4" sx={{ paddingTop: '1rem' }} gutterBottom>{result.name}</Typography>
                        <Typography variant="button" display="block" sx={{ paddingTop: '0.1rem', color: 'text.secondary' }} gutterBottom>Author: <Link href={`/channel/${result.user}`} underline="none" style={{width: '100%'}}>{result.user_obj.username}</Link></Typography>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
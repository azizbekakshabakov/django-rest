// import { AppBarComponent } from "../mui/app-bar";
import { SideBar } from "./SideBar";
import { NavBar } from './NavBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDB } from './db-hook';
import Container from '@mui/material/Container';

// const drawerWidth = 240;

export const Error = () => {

    const { result, error } = useDB(`http://127.0.0.1:8000/api/v1/video/`);

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

                        <Typography variant="h4" sx={{ paddingTop: '1rem' }} style={{ alignItems: "center",textAlign: "center", marginTop: "10rem", display: "flex", justifyContent: "center" }} gutterBottom>You're not allowed to this page</Typography>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
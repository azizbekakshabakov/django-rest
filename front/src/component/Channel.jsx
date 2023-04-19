// import { AppBarComponent } from "../mui/app-bar";
import { SideBar } from "./SideBar";
import { Outlet, useParams } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDB } from './db-hook';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { NavBar } from './NavBar';

// const drawerWidth = 240;

export const Channel = () => {
    
    const { result, error } = useDB(`http://127.0.0.1:8000/api/v1/video/?user=${useParams()['userid']}`);

    // if (result === undefined) console.log('load');
    // else {
    //     console.log(result);
    // }

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

                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {result.results.map((video, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>

                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={`${video.preview}`}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Link href={`/video/${video.id}`} underline="none" style={{width: '100%'}}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {video.name}
                                                </Typography>
                                            </Link>
                                        </CardContent>
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>

                    </Container>
                </Box>
            </Box>
            
        {/* </Grow> */}
        </>
    );
}
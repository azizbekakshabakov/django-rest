import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const NavBar = () => {

    const logout = () => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        window.location.replace("/");
    };

    const renderNotLogged = (
        <>
        <Typography variant="h6" component="a" href="/signup"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                paddingRight: '1rem'
            }}>
            Sign up
        </Typography>
        <Typography variant="h6" component="a" href="/login"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
            }}>
            Login
        </Typography>
        </>
    );

    const renderLogged = (
        <>
        <Typography variant="h6" component="a" href="/cabinet"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                paddingRight: '1rem'
            }}>
            Cabinet
        </Typography>
        <Typography variant="h6" component="a" href="#" onClick={logout}
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
            }}>
            Log out
        </Typography>
        </>
    );


    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" href="/" noWrap component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        paddingLeft: '1rem',
                        
                    }}
                >
                    Home
                </Typography>
                <Typography sx={{flexGrow: 1}}></Typography>
                { localStorage.getItem("refreshToken") !== null ? renderLogged : renderNotLogged }
                
            </Toolbar>
        </AppBar>
    );
}
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useDB } from './db-hook';
import Link from '@mui/material/Link';

const drawerWidth = 240;

export const SideBar = () => {
    const { result, error } = useDB('http://127.0.0.1:8000/api/v1/user/');

    // if (result === undefined) console.log('load');
    // else {
    //     console.log(result);
    // }

    if (result === undefined) return (
        <></>
    );

    return (
        <Drawer
        variant="permanent"
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Channels" />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            {result.results.map((user, index) => (
            <ListItem key={index} disablePadding>
                <Link href={`/channel/${user.pk}`} underline="none" style={{width: '100%'}}>
                    <ListItemButton>
                        {user.username}
                    </ListItemButton>
                </Link>
            </ListItem>
            ))}
        </List>
        </Box>
        </Drawer>
    );
}
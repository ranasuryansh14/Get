import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import { Notes } from '@mui/icons-material';

const Navbar = () => {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, left: open });
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography variant="h6" sx={{ padding: 2, textAlign: 'center' }}>
                
            </Typography>
            <Divider />
            <List>
                {[
                    { text: 'Home', icon: <HomeIcon /> },
                    { text: 'My Notes', icon: <DescriptionOutlinedIcon/> },
                    { text: 'Sell Notes', icon: <CurrencyExchangeSharpIcon/> },
                    { text: 'Store', icon: <StoreSharpIcon /> },
                    { text: 'Contact', icon: <PermContactCalendarIcon /> },
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <AppBar position="static" sx={{ width: '100%' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center',fontFamily:"Poppins" }}>
                        Notes Buddy
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}

export default Navbar;

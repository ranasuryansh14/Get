import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './Navbar.css';

const Navbar = () => {
    const [state, setState] = useState({
        left: false,
    });

    const [loginSignup, setLoginSignup] = useState(false);

    const dropdownRef = useRef(null);

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
            <Typography variant="h6" sx={{ color: '#000233', padding: 2, textAlign: 'center' }}>
                Notes Buddy
            </Typography>
            <Divider />
            <List sx={{ color: "#000233" }}>
                {[
                    { text: 'Home', icon: <HomeIcon />, path: '/' },
                    { text: 'My Notes', icon: <DescriptionOutlinedIcon />, path: '/notes/MyNotes' },
                    { text: 'Sell Notes', icon: <CurrencyExchangeSharpIcon />, path: '/sell/MySell' },
                    { text: 'Store', icon: <StoreSharpIcon />, path: '/store/MyStore' },
                    { text: 'Contact', icon: <PermContactCalendarIcon />, path: '/contact/MyContact' },
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setLoginSignup(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <AppBar position="static" sx={{ width: '100%', color: '#fff', backgroundColor: "#000233" }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: "Poppins" }}>
                        Notes Buddy
                    </Typography>
                    <IconButton aria-label="sign up" color="inherit" onClick={() => setLoginSignup(!loginSignup)}>
                        <PersonAddIcon />
                    </IconButton>
                    {loginSignup && (
                        <Box
                            ref={dropdownRef}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'absolute',
                                right: 0,
                                top: 50,
                                backgroundColor: '#fff',
                                padding: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                zIndex: 1201
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginBottom: 1 }}
                                component={Link}
                                to="/auth/SignUp"
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                component={Link}
                                to="/auth/Login"
                            >
                                Login
                            </Button>
                        </Box>
                    )}
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
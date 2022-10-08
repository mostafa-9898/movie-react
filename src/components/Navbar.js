import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// components
import SingUp from "./SingUp";
import LogIn from "./LogIn";

// image
import logo from '../public/logo.png'

// context for light and dark mode
import { ColorModeContext } from "../context/theme/MUI_MODE";

// mui
import {
    AppBar, Box, Button, Drawer,
    IconButton, List, ListItem, ListItemButton,
    Tooltip, Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

const Navbar = () => {

    const location = useLocation()

    const { mode, toggleMode } = useContext(ColorModeContext)

    const [menu, setMenu] = useState();

    const menuItems = [
        { name: 'Movies', path: '/movie' },
        { name: 'Tv Series', path: '/tv' },
    ]

    return (

        <AppBar position="static" color="secondary"
            sx={{ boxShadow: 'none', px: { xs: '10px', md: '20px' }, py: '10px' }}
        >
            <Box display='flex' alignItems='center'>

                {/* responsive menu */}
                <Box flexGrow={1} display={{ md: 'none', lg: 'none', xl: 'none' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color='inherit'
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setMenu(true)}
                    >
                        <MenuIcon sx={{ fontSize: '30px' }} />
                    </IconButton>

                    <Drawer
                        anchor='left'
                        open={menu}
                        onClose={() => setMenu(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={() => setMenu(false)}
                            onKeyDown={() => setMenu(false)}
                        >
                            <List>
                                <ListItem disablePadding
                                    sx={{
                                        display: 'flex', flexDirection: 'column', gap: '20px',
                                        width: '100%', px: '20px', mt: '50px'
                                    }}
                                >
                                    {menuItems.map(item =>

                                        <Link to={item.path} key={item.name}>
                                            <ListItemButton display='flex' alignItems='center' sx={{ width: '100%', gap: '15px' }}>
                                                <Typography variant="body1" component='h1' fontWeight={600} color='primary'>
                                                    {item.name}
                                                </Typography>
                                            </ListItemButton>
                                        </Link>

                                    )}
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </Box>


                {/* laptap menu */}
                <Box flexGrow={1} display={{ xs: 'none', sm: 'none', md: 'flex' }} alignItems='center' gap='40px' >

                    <img src={logo} alt='logo_Image' width={70} height={65} />

                    <Box display='flex' alignItems='center' gap='15px'>
                        {menuItems.map(item =>

                            <Link to={item.path} key={item.name}>
                                <Button variant="text" sx={{
                                    fontSize: '1rem',
                                    borderBottom: `${location.pathname === item.path ? '2px solid orange' : 'none'}`
                                }}>
                                    {item.name}
                                </Button>
                            </Link>

                        )}
                    </Box>

                </Box>


                {/* Light / Dark */}
                <Tooltip title='Mode'>
                    <IconButton onClick={toggleMode} color='primary'>
                        {mode === 'light' ? <ModeNightIcon sx={{ fontSize: '25px' }} /> :
                            <LightModeIcon sx={{ color: '#fca311', fontSize: '25px' }} />}
                    </IconButton>
                </Tooltip>

                {/* Person Account */}
                <Box ml={{ xs: '10px', sm: '10px', md: '20px' }} display='flex' alignItems='center' gap='10px' >

                    <SingUp />

                    <LogIn />

                </Box>

            </Box>
        </AppBar>

    );
}

export default Navbar;
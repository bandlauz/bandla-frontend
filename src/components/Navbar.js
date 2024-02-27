import React from 'react'
import Request from '../util/Request';
import { useState, useEffect } from "react";
import { Box, Button, Avatar, Container, Menu, Tooltip, Grid, Link, IconButton, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { Logout, Settings } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import NavbarSimple from "../components/NavbarSimple"

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [profileImg, setProfileImg] = useState();
    const MYPROFILE_URL = "https://api.bandla.uz/api/profile/my";

    const navigateToHome = () => {
        console.log("Navbar navigate");
    };

    const fetchData = async () => {
        if (!localStorage.getItem("accessToken")) {
            setLoggedIn(false);
            return;
        }
        try {
            const myprofile = await Request(MYPROFILE_URL, "get", null, null, true, null, navigateToHome);
            setLoggedIn(true);
            setProfileImg(myprofile.data.data.photoUrl)
        } catch (error) {
            setLoggedIn(false);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (loggedIn == null) {
        return (<NavbarSimple />)
    }

    return (
        <>
            <Box
                sx={{
                    paddingTop: 0.5,
                    marginBottom: 1
                }}>
                <Container>
                    <Grid container>
                        <Grid item xs={4} align="left">
                            <Link color="inherit" href="https://bandla.uz">
                                <img src={process.env.PUBLIC_URL + "/logo-black.png"}
                                    alt="Bandla image"
                                    height={35}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} align="right">
                            {!loggedIn ?
                                <a href="/login" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" style={{ backgroundColor: 'rgb(0,109,199)' }}>
                                        Войти
                                    </Button>
                                </a>
                                :
                                <React.Fragment>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{
                                            display: 'inline-block',
                                            padding: 0,
                                            minHeight: 0,
                                            minWidth: 0
                                        }}>
                                        <Avatar
                                            src={profileImg}
                                            sx={{ width: 35, height: 35 }}>B</Avatar>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.4,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                        <a href="/profile" style={{ textDecoration: 'none', color: "black" }}>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <PersonIcon fontSize="small" />
                                                </ListItemIcon>
                                                Profile
                                            </MenuItem>
                                        </a>
                                        <Divider />
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Settings
                                        </MenuItem>
                                        <a href="/logout" style={{ textDecoration: 'none', color: "red" }}>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" style={{ color: "red" }} />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </a>
                                    </Menu>
                                </React.Fragment>
                            }
                        </Grid>
                    </Grid>
                </Container>
                <Divider />
            </Box>
        </>);
}

export default Navbar;
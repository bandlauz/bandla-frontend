import React from 'react'
import Request from '../util/Request';
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function Navbar() {
    const MYPROFILE_URL = "https://api.bandla.uz/api/profile/my";
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileImg, setProfileImg] = useState();

    const navigateToHome = () => {
        console.log("Navbar navigate");
    };

    const fetchData = async () => {
        if (!localStorage.getItem("accessToken")) {
            return;
        }
        try {
            const myprofile = await Request(MYPROFILE_URL, "get", null, null, true, null, navigateToHome);
            setLoggedIn(true);
            setProfileImg(myprofile.data.data.photoUrl)
        } catch (error) {
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
    return (
        <Box
            sx={{
                marginBottom: 1,
                p: 1
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
                            </a> :
                            <React.Fragment>
                                {/* <Box> */}
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        // sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}>
                                        <Avatar
                                            src={profileImg}
                                            sx={{ width: 35, height: 35 }}>B</Avatar>
                                    </IconButton>
                                </Tooltip>
                                {/* </Box> */}
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
                                            mt: 1.5,
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
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <a href="/profile" style={{ textDecoration: 'none', color: "black" }}>
                                        <MenuItem onClick={handleClose}>
                                            <Avatar />
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
        </Box>);
}

export default Navbar;
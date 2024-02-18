import * as React from "react";
import './Home.css';
import Request from '../src/util/Request';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
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

function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const MYPROFILE_URL = "https://api.bandla.uz/api/profile/my";
    const [profileImg, setProfileImg] = useState();
    const navigate = useNavigate();

    const fetchData = async () => {
        if (!localStorage.getItem("accessToken")) {
            return;
        }
        setLoggedIn(true);
        const myprofile = await Request(MYPROFILE_URL, "get", null, null, true, null, navigate);
        setProfileImg(myprofile.data.data.photoUrl)
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
        <div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                {!loggedIn ?
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ backgroundColor: 'rgb(0,109,199)' }} sx={{ m: 2, top: "0px", right: "0px" }}>
                            Войти
                        </Button>
                    </Link> :
                    <React.Fragment>
                        <Box sx={{ m: 2, top: "0px", right: "0px" }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}>
                                    <Avatar
                                        src={profileImg}
                                        sx={{ width: 45, height: 45 }}>B</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
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
                            <Link to="/profile" style={{ textDecoration: 'none', color: "black" }}>
                                <MenuItem onClick={handleClose}>
                                    <Avatar />
                                    Profile
                                </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <Link to="/logout" style={{ textDecoration: 'none', color: "red" }}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" style={{ color: "red" }} />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Link>
                        </Menu>
                    </React.Fragment>
                }
            </div>
            <Box sx={{ borderRadius: '16px', backgroundColor: '#1E374B', width: 290 }}
                padding={0.004} mx="auto">
                <h3 style={{ color: "white" }} align="center">Hello from Bandla system 👀</h3>
            </Box>
            <div className="image-container">
                <img src={process.env.PUBLIC_URL + "/logo.png"}
                    alt="Bandla image"
                    width="335" />
            </div>
            <h3 align="center">Jamoamizga Web-dizayner kerak🔎</h3>
            <h3 align="center">В нашу команду нужен Веб-дизайнер🔎</h3>
            <h3 align="center">Our team needs a Web-designer🔎</h3>
        </div >);
}

export default Home;
import React from 'react';
import Request from '../util/Request';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Avatar,
  Container,
  Menu,
  Tooltip,
  Grid,
  Link,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonIcon from '@mui/icons-material/Person';
import NavbarSimple from '../components/NavbarSimple';
import Alert from './Alert';
import './css/Navbar.css';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [profileImg, setProfileImg] = useState();
  const [avatarLtr, setAvatarLtr] = useState('B');
  const [logingout, setLogingout] = useState(false);
  const MYPROFILE_URL = 'https://api.bandla.uz/api/profile/my';

  const navigateToHome = () => {};

  const fetchData = async () => {
    if (!localStorage.getItem('accessToken')) {
      setLoggedIn(false);
      return;
    }
    try {
      const myprofile = await Request(
        MYPROFILE_URL,
        'get',
        null,
        null,
        true,
        null,
        navigateToHome
      );
      setLoggedIn(true);
      setProfileImg(myprofile.data.data.photoUrl);
      if (myprofile.data.data.firstName)
        setAvatarLtr(myprofile.data.data.firstName[0]);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path) => {
    setAnchorEl(null);
    if (typeof path === 'string') window.location.href = path;
  };

  if (loggedIn == null) {
    return <NavbarSimple />;
  }

  return (
    <Box
      sx={{
        paddingTop: 0.5,
        marginBottom: 1,
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={4}>
            <Link color="inherit" onClick={() => handleClose('/')}>
              <img
                src={process.env.PUBLIC_URL + '/logo-black.png'}
                alt="Bandla image"
                height={35}
              />
            </Link>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid
            item
            xs={4}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Link
              color="inherit"
              onClick={() => handleClose('/about')}
              style={{
                textDecoration: 'none',
                marginRight: '10px',
                textWrap: 'nowrap',
                cursor: 'pointer',
              }}
            >
              Biz haqimiqda
            </Link>
            {!loggedIn ? (
              <Link
                onClick={() => handleClose('/login')}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'rgb(0,109,199)' }}
                >
                  Kirish
                </Button>
              </Link>
            ) : (
              <React.Fragment>
                <Tooltip title="Hisobim sozlamari">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{
                      display: 'inline-block',
                      padding: 0,
                      minHeight: 0,
                      minWidth: 0,
                    }}
                  >
                    <Avatar
                      src={profileImg}
                      className="avatar"
                      style={profileImg ? { background: 'none' } : {}}
                      sx={{
                        width: 35,
                        height: 35,
                        border: '0.1px solid lightgray',
                      }}
                    >
                      {avatarLtr}
                    </Avatar>
                  </IconButton>
                </Tooltip>
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
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => handleClose('/profile')}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profil
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Sozlamar
                  </MenuItem>
                  <MenuItem onClick={() => handleClose('/company')}>
                    <ListItemIcon>
                      <CorporateFareIcon fontSize="small" />
                    </ListItemIcon>
                    Kompaniya
                  </MenuItem>
                  <MenuItem
                    onClick={() => setLogingout(true)}
                    style={{ textDecoration: 'none', color: 'red' }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" style={{ color: 'red' }} />
                    </ListItemIcon>
                    Chiqish
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Container>
      <Divider />
      {logingout && (
        <Alert show={logingout} onHide={() => setLogingout(false)}>
          <p>Akkauntdan chiqmoqchimisiz?</p>
          <button buttonkey="true" onClick={() => setLogingout(false)}>
            Yopish
          </button>
          <button
            buttonkey="true"
            className="delete_button"
            onClick={() => handleClose('/logout')}
          >
            Chiqish
          </button>
        </Alert>
      )}
    </Box>
  );
}

export default Navbar;

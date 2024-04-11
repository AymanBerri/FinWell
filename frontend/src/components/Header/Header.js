import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import FinwellLogoWhite from '../../assets/white-logo512.png';

const pages = [];
const settings = ['Profile', 'Support', 'Logout'];

function Header() {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = async (setting) => {
    if (setting === 'Logout') {
      const confirmLogout = window.confirm('Are you sure you want to logout?');
      if (confirmLogout) {
        try {
          // Fetch the token from localStorage or wherever it's stored
          const token = localStorage.getItem('authToken'); // Adjust this based on your implementation
  
          const response = await axios.post('http://localhost:8000/logout/',{}, // Empty object for POST request data
            {
              headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (response.status === 200) {
            window.location.href = '/'; // Redirect to landing page
          } else {
            console.error('Logout failed:', response.statusText);
            // Handle error response
          }
        } catch (error) {
          console.error('Logout failed:', error.message);
          // Handle network errors or other unexpected errors
        }
      }
    } else if (setting === 'Profile') {
      navigate(`settings/${setting.toLowerCase()}`);
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" style={{backgroundColor: '#3498db'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/portal/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: '10px',
              '&:hover': {
                color: '#c4c4c4', 
              },
            }}
          >
            <img src={FinwellLogoWhite} width={24} height={24} alt='FinWell Logo' />
            FinWell
          </Typography>

           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            > 
              <MenuIcon />
            </IconButton>
            
             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>

          
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/portal/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: '#c4c4c4', 
              },
            }}
          >
            <img src={FinwellLogoWhite} width={24} height={24} alt='FinWell Logo' />
            FinWell
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box> 



          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src="/broken-image.jpg"
                sx={{
                  backgroundColor: 'white',
                  color: '#3498db',
                }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>



        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
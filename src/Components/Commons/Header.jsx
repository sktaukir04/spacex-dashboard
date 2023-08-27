import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { AddCircleOutline, Delete, ExitToApp } from '@mui/icons-material';
import { Circle, ExpandLess, ExpandMore, Grid3x3 } from '@mui/icons-material';



export default function PrimarySearchAppBar(props = { drawerWidth: "300px" }) {
  const [isSectionsOpen, setIsSectionsOpen] = React.useState(false)
  const { window } = props;
  const [menuItems, setMenuItems] = React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const drawer = (
    <div>
      <List disablePadding>
        <ListItem>
          <ListItemButton onClick={() => {
            setMenuItems((prev) => {
              return [...prev, [`Menu Item ${prev.length + 1}`]]
            })
            console.log(menuItems);
          }}>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <Typography>Menu Items</Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={() => { setIsSectionsOpen(isSectionsOpen => !isSectionsOpen) }}>
          <ListItemIcon>
            <Grid3x3 />
          </ListItemIcon>
          <ListItemText primary="Menus" />
          {isSectionsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={isSectionsOpen} timeout="auto" unmountOnExit >
          <List component={"div"} disablePadding>
            {
              menuItems.length ?
                menuItems.map((section, index) => (
                  <ListItem sx={{ width: 'fit-content' }} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        console.log("section selected ", section._id);
                        setSections(sections, section._id)
                      }}
                    >
                      <ListItemIcon>
                        <Circle />
                      </ListItemIcon>
                      <ListItemText variant={'p'} primary={section} />
                    </ListItemButton>
                  </ListItem>
                ))
                :
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <Circle />
                    </ListItemIcon>
                    <ListItemText primary="No Menus" />
                  </ListItemButton>
                </ListItem>
            }

          </List>
        </Collapse>


      </List>
      <Divider />
      <List>
        {['Delete All Menus'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setMenuItems([])}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '.MuiMenu-paper': {
          padding: "10px"
        }
      }}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"} >
        <Avatar></Avatar>
        {/* <Typography>{session.session.email}</Typography> */}
        <Typography>sample@email.com</Typography>
      </Stack>
      <Divider sx={{ m: 2 }} />
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar color='secondary'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
          zIndex: 999
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <img src="/images/logo.png" width={"50px"} height={"50px"} alt="" srcset="" /> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            App Name
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Avatar />
              <Typography>UserName</Typography>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Box
        component="nav"
        sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth, marginTop: "75px" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

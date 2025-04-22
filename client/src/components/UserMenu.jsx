import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider.jsx';
import { Avatar, MenuItem, Menu, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function UserMenu() {
  const { user: { displayName, photoURL, auth  } } = useContext(AuthContext);
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const open = Boolean(anchorEl)

  // console.log({user});

  // khi user nhấn vào nút menuitem (ở đây item là logout)
  const handleLogout = () => {
    auth.signOut();
  }

  // khi ko làm gì thì cái menu sẽ tự động đóng
  const handleClose = () => {
    setAnchorEl(null);
  }

  // handleClick là hàm xử lý sự kiện khi click vào box
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  return (
    <>
      <Box sx={{ display: 'flex'}} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar alt='avatar' src={photoURL} sx={{ width: 24, height: 24, marginLeft: '5px' }} />
      </Box>
      <Menu 
        // thêm các attribute cho menu
        id="basic-menu"
        anchorEl={anchorEl} // anchorEl là vị trí mà menu sẽ được hiển thị (ở đây là xung quanh cái box (name + avatar))
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

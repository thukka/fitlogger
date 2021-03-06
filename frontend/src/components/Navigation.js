import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logOut } from '../reducers/userReducer';

const Navigation = () => {
  const dispatch = useDispatch();

  const logOutUser = () => {
    window.localStorage.clear();
    dispatch(logOut());
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction component={Link} to='/frontpage' label='Home' icon={<HomeIcon sx={{ color: 'lightblue' }} />} />
        <BottomNavigationAction component={Link} to='/stats'label='Stats' icon={<BarChartIcon sx={{ color: 'green' }} />} />
        <BottomNavigationAction onClick={logOutUser} label='Logout' icon={<LogoutIcon sx={{ color: 'darkred' }} />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
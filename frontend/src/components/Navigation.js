import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = () => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label='Frontpage' icon={<HomeIcon sx={{ color: 'lightblue' }} />} />
        <BottomNavigationAction label='Stats' icon={<BarChartIcon sx={{ color: 'green' }} />} />
        <BottomNavigationAction label='Logout' icon={<LogoutIcon sx={{ color: 'darkred' }} />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
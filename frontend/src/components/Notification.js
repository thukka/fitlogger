import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const Notification = ({ error, notification }) => {

  const notificationStyle = { 'top': 10, 'position': 'absolute', 'zIndex': 9 };

  if (!error) {
    return (
      <div style={notificationStyle}>
        <Alert severity='success' variant='filled' >
          <AlertTitle>Success</AlertTitle>
          {notification}
        </Alert>
      </div>
    );
  }

  return (
    <div style={notificationStyle}>
      <Alert severity='error' variant='filled' >
        <AlertTitle>Error</AlertTitle>
        {notification}
      </Alert>
    </div>
  );

};

export default Notification;
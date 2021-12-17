import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const Notification = ({ error, notification }) => {
  if (!error) {
    return (
      <div style={{ 'marginTop': 10 }}>
        <Alert severity='success' variant='filled' >
          <AlertTitle>Success</AlertTitle>
          {notification}
        </Alert>
      </div>
    );
  }

  return (
    <div style={{ 'marginTop': 10 }}>
      <Alert severity='error' variant='filled' >
        <AlertTitle>Error</AlertTitle>
        {notification}
      </Alert>
    </div>
  );

};

export default Notification;
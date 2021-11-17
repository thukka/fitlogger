import React from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const Notification = ({ error }) => {
  return (
    <div style={{ 'marginTop': 10 }}>
      <Alert severity='error' variant='filled' >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </div>
  );
};

export default Notification;
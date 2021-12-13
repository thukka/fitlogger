import React from 'react';
import Navigation from './Navigation';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';

const FrontPage = ( { user }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit was pressed!');
    const data = new FormData(event.currentTarget);
    console.log('get input kilometers', data.get('distance'));
    console.log('get date: ', data.get('date'));
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Typography component='h1' variant='h5' sx={{ mb: 2 }}>Hello {user.name} :) </Typography>
      <Typography component='h1' variant='h5'>Add entry</Typography>
      <TextField id='input-date' name='date' margin='normal' label='Date' variant='outlined' type='date' InputLabelProps={{
        shrink: true,
      }} />
      <TextField id='input-distance' name='distance' margin='normal' label='Distance (km)' variant='outlined' />
      <TextField id='input-duration' name='duration' margin='normal' label='Duration (minutes)' variant='outlined' />
      <TextField id='input-difficulty' name='difficulty' margin='normal' label='Difficulty level' variant='outlined' />
      <Stack spacing={2} direction='row' sx={{ mt: 2 }}>
        <Button variant='outlined'>Reset</Button>
        <Button variant='contained' type='submit'>Submit</Button>
      </Stack>
      <Navigation />
    </Box>
  );
};

export default FrontPage;
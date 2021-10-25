import React from 'react';
import Navigation from './Navigation';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';


const FrontPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit was pressed!');
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
      <Typography component='h1' variant='h5'>Add entry</Typography>

      <TextField id='input-date' margin='normal' label='Date' variant='outlined' />
      <TextField id='input-kilometers' margin='normal' label='Kilometers' variant='outlined' />
      <TextField id='input-difficulty' margin='normal' label='Difficulty level' variant='outlined' />

      <Stack spacing={2} direction='row' sx={{ mt: 2 }}>
        <Button variant='outlined'>Reset</Button>
        <Button variant='contained' type='submit'>Submit</Button>
      </Stack>
      <Navigation />
    </Box>
  );
};

export default FrontPage;
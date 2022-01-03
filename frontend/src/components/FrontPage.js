import React from 'react';
import Navigation from './Navigation';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import { addEntry } from '../services/entry';
import { useSelector } from 'react-redux';

const FrontPage = ({ setNotificationMessage }) => {
  const user = useSelector(state => state);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const distance = data.get('distance');
    const date = data.get('date');
    const difficulty = data.get('difficulty');
    const duration = data.get('duration');

    const entry = {
      user: user.username,
      date: date,
      difficulty: difficulty.length <= 0 ? 0 : difficulty,
      duration: duration,
      distance: distance,
    };

    await addEntry(user.token, entry);
    setNotificationMessage('New entry added!');
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
      <TextField id='input-difficulty' name='difficulty' margin='normal' label='Difficulty level (1-10)' variant='outlined' />
      <Stack spacing={2} direction='row' sx={{ mt: 2 }}>
        <Button variant='outlined'>Reset</Button>
        <Button variant='contained' type='submit'>Submit</Button>
      </Stack>
      <Navigation />
    </Box>
  );
};

export default FrontPage;
import React from 'react';
import { Container, Box, Avatar, Typography, TextField, Button } from '@mui/material';
import loginUser from '../services/login';
import LockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from 'react-router-dom';

const LoginPage = ({ setUser, setNotificationMessage, setIsError }) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const email = data.get('email');
      const password = data.get('password');
      const userData = await loginUser(email, password);

      setUser(userData);
      window.localStorage.setItem('loggedUser', JSON.stringify(userData));
      history.push('/frontpage');
    } catch (err) {
      let errMsg = err.response?.data.error;

      if (errMsg === undefined) {
        errMsg = err.message;
      }
      setIsError(true);
      setNotificationMessage(errMsg);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <VpnKeyIcon />
                </InputAdornment>
              )
            }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >Sign in</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
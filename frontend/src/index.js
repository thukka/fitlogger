import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseLine from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242'
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseLine />

    <Container>
      <Router>
        <App />
      </Router>
    </Container>
  </ThemeProvider>,
  document.getElementById('root')
);
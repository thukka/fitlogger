import ReactDOM from 'react-dom';
import App from './App';
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
    /*     primary: {
          light: '#6d6d6d',
          main: '#424242',
          dark: '#1b1b1b',
          contrastText: '#ffffff'
        },
        secondary: {
          light: '#ffd95a',
          main: '#f9a825',
          dark: '#c17900',
          contrastText: '#000000'
        } */
  }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      
      <Container>
        <App />
      </Container>
    </ThemeProvider>,
  document.getElementById('root')
);
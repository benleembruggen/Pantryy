import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './Context/AuthContext';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#F55860',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <CssBaseline />
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

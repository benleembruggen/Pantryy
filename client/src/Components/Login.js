import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
//style
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import food from '../images/food.svg';

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/pantry');
      }
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: `url(${food})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(32, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              onChange={onChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              // autoComplete='email'
              autoFocus
            />
            <TextField
              onChange={onChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;

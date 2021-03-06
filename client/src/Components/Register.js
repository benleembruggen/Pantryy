import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
// styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const Register = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: '', password: '', role: '' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          AuthService.login(user).then((data) => {
            const { isAuthenticated, user } = data;
            if (isAuthenticated) {
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              props.history.push('/home');
            } else {
            }
          });
        }, 1000);
      }
    });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                onChange={onChange}
                // autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={onChange}
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;

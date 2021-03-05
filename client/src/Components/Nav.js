import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import KitchenIcon from '@material-ui/icons/Kitchen';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AuthService from '../Services/AuthService';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { AuthContext } from '../Context/AuthContext';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    backgroundColor: 'black',
    position: 'fixed',
    left: '0',
    bottom: '0',
    '& > *': {
      color: 'white',
    },
  },
});

const Nav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Home'
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/pantry'
            label='Pantry'
            icon={<KitchenIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/recipe'
            label='Recipe Search'
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            component={Link}
            onClick={onClickLogoutHandler}
            label='Logout'
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
      </>
    );
  };

  const unAuthenticatedNavBar = () => {
    return (
      <>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Home'
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/login'
            label='Login'
            icon={<LockOpenIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/register'
            label='Register'
            icon={<PersonAddIcon />}
          />
        </BottomNavigation>
      </>
    );
  };

  return (
    <>{isAuthenticated ? authenticatedNavBar() : unAuthenticatedNavBar()}</>
  );
};

export default Nav;

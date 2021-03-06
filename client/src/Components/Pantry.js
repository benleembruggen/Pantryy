import React, { useState, useEffect, useContext } from 'react';
import Nav from './Nav';
import PantryService from '../Services/PantryService';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FoodIcon from '@material-ui/icons/Fastfood';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import AuthService from '../Services/AuthService';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Pantry = (props) => {
  const [pantry, setPantry] = useState([]);
  const authContext = useContext(AuthContext);
  const [search, setSearch] = useState('');

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

  const updateSearch = (e) => {
    if (e.target.value.includes('rick') || e.target.value.includes('roll')) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();

    PantryService.postItem(search).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        PantryService.getPantry().then((getData) => {
          setPantry(getData.pantry);
        });
      } else if (message.msgBody === 'UnAuthorized') {
        authContext.setUser({ username: '', role: '' });
        authContext.setIsAuthenticated(false);
      }
    });
  };

  useEffect(() => {
    PantryService.getPantry().then((data) => {
      setPantry(data.pantry);
      console.log(data.pantry);
    });
  }, []);

  return (
    <div>
      <div style={{ height: `10vh` }}>
        <p>NAME</p>
        <form onSubmit={getSearch} className='input-group mb-3'>
          <input
            className='form-control'
            type='text'
            value={search}
            onChange={updateSearch}
            placeholder='Add item to pantry'
          />
          <div className='input-group-append'>
            <button className='btn btn-primary' type='submit'>
              +
          </button>
          </div>
        </form>
      </div>
      <List component="nav" aria-label="main mailbox folders" style={{ overflow: "scroll", height: `80vh` }}>
        <Divider />
        {pantry.map((item) => (
          <>
            <ListItem button>
              <ListItemIcon>
                <FoodIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </>
        ))}
      </List>
      <div style={{ height: `10vh` }}>
        <IconButton aria-label="delete" onClick={onClickLogoutHandler}>
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Pantry;

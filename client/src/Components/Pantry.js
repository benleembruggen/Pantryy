import React, { useState, useEffect, useContext } from 'react';
import PantryService from '../Services/PantryService';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import AuthService from '../Services/AuthService';
import Paper from '@material-ui/core/Paper';
import PantryItem from './PantryItem';
import AddItemModal from './AddItemModal';


function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

const Pantry = (props) => {
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

  useEffect(() => {
    PantryService.getPantry().then((data) => {
      props.setPantry(data);
    });
  }, []);

  return (
    <Paper elevation={3}>
      <Button onClick={() => props.setItemModalOpen(true)} variant='contained' color='primary' style={{ marginTop: '3px', height: '50px' }}>
        Add item to pantry
      </Button>
      <List
        component='nav'
        aria-label='main mailbox folders'
        style={{ overflowY: 'scroll', height: `calc(80vh - 50px)` }}
      >
        <Divider />
        {props.pantry.map((item) => <PantryItem item={item} />)}
      </List>
      <div style={{ height: `10vh` }}>
        <Button aria-label='delete' onClick={onClickLogoutHandler}>
          <br></br>
          <LogoutIcon />
          Logout
        </Button>
      </div>
    </Paper>
  );
};

export default Pantry;

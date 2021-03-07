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
import { shoppingList } from '../utils/getShoppingList';
import CartService from '../Services/CartService';

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 'calc(100% - 250px)',
    top: '10vh',
    width: '250px',
    height: '90vh',
    zIndex: 100,
  },
  list: {
    overflowY: 'scroll',
    height: `calc(90vh - 50px)`
  },
  button: {
    height: '50px',
  }
}));

const ShoppingList = ({ open, setCart, cart }) => {
  const classes = useStyles();

  useEffect(() => {
    CartService.getCart().then(setCart);
  }, [])

  if (!open) return null;

  return (
    <Paper elevation={3} className={classes.root}>
      <List
        component='nav'
        aria-label='main mailbox folders'
        className={classes.list}
      >
        <Divider />
        {cart.map((item) => <PantryItem item={item} />)}
      </List>
      <Button className={classes.button}>Order from coles</Button>
    </Paper >
  );
};

export default ShoppingList;

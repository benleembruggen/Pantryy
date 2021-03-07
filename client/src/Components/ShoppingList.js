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

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

const style = {
  position: 'absolute',
  left: 'calc(100% - 250px)',
  // float: 'right',
  width: '250px',
  height: '100%',
  // zIndex: -100,
  background: '#042331',
  // transition: 'all 0.5s ease',
}

const ShoppingList = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <Paper elevation={3} style={style}>
      <List
        component='nav'
        aria-label='main mailbox folders'
        style={{ overflow: 'scroll', height: `80vh` }}
      >
        <Divider />
        {shoppingList.map((item) => <PantryItem item={item} />)}
      </List>
    </Paper>
  );
};

export default ShoppingList;

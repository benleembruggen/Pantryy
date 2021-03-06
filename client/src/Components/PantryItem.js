import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { quantityToString } from '../utils/measures';


const PantryItem = ({ item }) => {
  return (
    <ListItem button>
      {/* <img src={item.img} width={47} height={47} /> */}
      <ListItemText primary={`· ${item.name}`} />
      <ListItemText style={{ textAlign: 'right' }} primary={quantityToString(item.quantity, item.preferredMeasure)} />
    </ListItem>
  )
}

export default PantryItem;
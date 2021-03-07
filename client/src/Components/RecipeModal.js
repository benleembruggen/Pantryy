import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import CartService from '../Services/CartService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '10vh',
    justifyContent: 'center',
    margin: 'auto',
    width: `60vw`,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const RecipeModal = ({ open, onClose, recipe, pantry }) => {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <h1>{recipe.recipe.label}</h1>
      <Divider />
      {recipe.recipe.ingredients.map((ingredient) => {
        for (let i = 0; i < pantry.length; i++) {
          if (ingredient.foodId === pantry[i].foodId) {
            return <p style={{ color: '#7EF571' }}>{ingredient.text}</p>;
          }
        }
        return (
          <p style={{ color: '#f55d58' }}>
            {ingredient.text}
            <IconButton size='small' onClick={() => CartService.postItem()}>
              <AddShoppingCartIcon />
            </IconButton>
          </p>
        );
      })}
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      {body}
    </Modal>
  );
};

export default RecipeModal;

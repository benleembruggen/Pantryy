import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../Context/AuthContext';
import { Autocomplete } from '@material-ui/lab';
import ItemService from '../Services/ItemService';
import Divider from '@material-ui/core/Divider';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

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
    const authContext = useContext(AuthContext);
    const [timerReference, setTimerReference] = useState(null);
    const [searchOptions, setSearchOptions] = useState([]);
    const [item, setItem] = useState(null);

    const body = (
        <div className={classes.paper}>
            <h1>{recipe.recipe.label}</h1>
            <Divider />
            {recipe.recipe.ingredients.map((ingredient) => {
                for (let i = 0; i < pantry.length; i++) {
                    if (ingredient.foodId === pantry[i].foodId) {
                        return <p style={{ color: '#7EF571' }}>{ingredient.text}</p>
                    }
                }
                return <p style={{ color: '#f55d58' }}>{ingredient.text}<IconButton size="small"><AddShoppingCartIcon /></IconButton></p>
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

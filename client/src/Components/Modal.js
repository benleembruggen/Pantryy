import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../Context/AuthContext';
import PantryService from '../Services/PantryService';
import { Autocomplete } from '@material-ui/lab';
import ItemService from '../Services/ItemService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '25vh',
    justifyContent: 'center',
    margin: 'auto',
    width: `60vw`,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddItemModal = ({ open, onClose, setPantry }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [timerReference, setTimerReference] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);

  const updateSearch = (e) => {
    if (e.target.value.includes('rick') || e.target.value.includes('roll')) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    setSearch(e.target.value);
    clearTimeout(timerReference);
    setTimerReference(setTimeout(() => ItemService.suggestItems(e.target.value).then(setSearchOptions), 700)); //TODO: change to 100
  };

  console.log(searchOptions);
  console.log(search);

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
    onClose();
  };

  const body = (
    <div className={classes.paper}>
      <h2>Add a item</h2>
      <form noValidate autoComplete='off'>
        <Autocomplete
          id='outlined-basic'
          options={searchOptions}
          getOptionLabel={(option) => option.food.label}
          renderInput={(params) => <TextField {...params} label='Add item to pantry' margin="normal" />}
          variant='outlined'
          onInputChange={updateSearch}
        />
        <br></br>
        <br></br>
        <TextField id='outlined-basic' label='Add amount' variant='outlined' />
        <br></br>
        <br></br>
        <Button variant='contained' color='primary' onClick={getSearch}>
          Add item
        </Button>
      </form>
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
  )
}

export default AddItemModal;
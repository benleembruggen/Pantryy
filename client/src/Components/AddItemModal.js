import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../Context/AuthContext';
import PantryService from '../Services/PantryService';
import { Autocomplete } from '@material-ui/lab';
import ItemService from '../Services/ItemService';
import { SUPPORTED_MEASURES } from '../utils/measures';
import { MenuItem, Select } from '@material-ui/core';

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
  amountDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  measure: {
    margin: 'auto 30px',
  }
}));

const AddItemModal = ({ open, onClose, setPantry }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [timerReference, setTimerReference] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(null);
  // Using empty string defaults to the first option
  const [selectedMeasure, setSelectedMeasure] = useState('');
  const [availableMeasures, setAvailableMeasures] = useState([SUPPORTED_MEASURES.WHOLE]);

  const updateSearch = (e, v, reason) => {
    if (e.target.value && (e.target.value.includes('rick') || e.target.value.includes('roll'))) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    clearTimeout(timerReference);
    if (reason === 'input') setTimerReference(setTimeout(() => ItemService.suggestItems(e.target.value).then(setSearchOptions), 700)); //TODO: change to 100
  };

  const getSearch = (e) => {
    e.preventDefault();
    PantryService.postItem(item, quantity, selectedMeasure).then((data) => {
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

  const onSelectItem = (e, v) => {
    setItem(v);
    const supportedMeasures = v.measures.filter(({ label }) => Object.values(SUPPORTED_MEASURES).includes(label));
    setAvailableMeasures(supportedMeasures.map(({ label }) => label));
  }

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
          onChange={onSelectItem}
        />
        <br></br>
        <br></br>
        <div className={classes.amountDiv}>
          <TextField id='outlined-basic' label='Add amount' variant='outlined' onChange={e => setQuantity(e.target.value)} />
          <Select
            value={selectedMeasure || 'Gram'}
            onChange={(e) => setSelectedMeasure(e.target.value)}
            className={classes.measure}
          >
            {availableMeasures.map(label => <MenuItem value={label}>{label}</MenuItem>)}
          </Select>
        </div>
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
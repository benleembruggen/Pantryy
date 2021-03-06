import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pantry from './Pantry';
import Recipe from './Recipe';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../Context/AuthContext';
import PantryService from '../Services/PantryService';

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

function Home() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [pantry, setPantry] = useState([]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
    closeModal();
  };

  const body = (
    <div className={classes.paper}>
      <h2>Add a item</h2>
      <form noValidate autoComplete='off'>
        <TextField
          id='outlined-basic'
          label='Add item to pantry'
          variant='outlined'
          onChange={updateSearch}
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
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <div style={{ height: `10vh` }}>
            <h2>Pantryy</h2>
            <Button onClick={openModal} variant='contained' color='primary'>
              Add item to pantry
            </Button>
          </div>
          <Pantry pantry={pantry} setPantry={setPantry} />
        </Grid>
        <Grid item xs={10}>
          <Recipe />
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import Pantry from './Pantry';
import Recipe from './Recipe';
import NewUserModal from './NewUserModal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddItemModal from './AddItemModal';
import PantryService from '../Services/PantryService';

function Home() {
  const [open, setOpen] = useState(false);
  const [pantry, setPantry] = useState([]);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    PantryService.getPantry().then((getData) => {
      if (getData.length < 1) {
        setNewUser(true);
      }
    });
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <div style={{ height: `10vh` }}>
            <div style={{ fontFamily: 'Lobster', color: '#f59b90' }}>
              <h2>Pantryy</h2>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant='contained'
              color='primary'
            >
              Add item to pantry
            </Button>
          </div>
          <Pantry pantry={pantry} setPantry={setPantry} />
        </Grid>
        <Grid item xs={10}>
          <Recipe />
        </Grid>
      </Grid>
      <AddItemModal
        open={open}
        onClose={() => setOpen(false)}
        setPantry={setPantry}
      />
      <NewUserModal
        open={newUser}
        onClose={() => setNewUser(false)}
        setPantry={setPantry}
      />
    </>
  );
}

export default Home;

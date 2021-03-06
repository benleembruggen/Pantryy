import React, { useState, useContext } from 'react';
import Pantry from './Pantry';
import Recipe from './Recipe';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddItemModal from './Modal';

function Home() {
  const [open, setOpen] = useState(false);
  const [pantry, setPantry] = useState([]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <div style={{ height: `10vh` }}>
            <h2>Pantryy</h2>
            <Button onClick={() => setOpen(true)} variant='contained' color='primary'>
              Add item to pantry
            </Button>
          </div>
          <Pantry pantry={pantry} setPantry={setPantry} />
        </Grid>
        <Grid item xs={10}>
          <Recipe />
        </Grid>
      </Grid>
      <AddItemModal open={open} onClose={() => setOpen(false)} setPantry={setPantry} />
    </>
  );
}

export default Home;

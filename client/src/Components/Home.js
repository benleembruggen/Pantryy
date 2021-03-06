import React from 'react';
import Pantry from './Pantry';
import Recipe from './Recipe';
import Grid from '@material-ui/core/Grid';

function Home() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <Pantry />
        </Grid>
        <Grid item xs={10}>
          <Recipe />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;

import React from 'react';
import Nav from './Nav';
import Pantry from './Pantry';
import Grid from '@material-ui/core/Grid';

function Home() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <Pantry />
        </Grid>
        <Grid item xs={10}>

        </Grid>
      </Grid>
    </>
  );
}

export default Home;

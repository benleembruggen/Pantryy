import React from 'react';
import Container from '@material-ui/core/Container';
import Search from './Search';
import RecipeList from './RecipeList';
import Nav from './Nav';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white',
    position: 'fixed',
    borderRadius: 0,
    width: '100vw',
    left: 0
  },
}));


function Recipe() {
  const classes = useStyles();
  return (
    <>
      <Nav />
      <Paper className={classes.root}>
        <h1 style={{margin:0, color:'#ff91a4', textShadow:'1px 1px 1px #dddddd'}}>Recipe Page</h1>
        <Search isLarge={true} placeholder="Search Recipes"/>
      </Paper>
      <br/>
      <br/>
      <Container >
        <br />
        <RecipeList />
      </Container>
    </>
  );
}

export default Recipe;

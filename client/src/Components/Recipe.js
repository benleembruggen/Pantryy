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
    borderRadius: 0,
    left: 0
  },
}));


function Recipe() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root}>
        <h1 style={{margin:0, color:'#ffffff', textShadow:'1px 1px 1px #000000'}}>Recipes</h1>
        <Search isLarge={true} placeholder="Search Recipes"/>
      </Paper>
      <Container >
        <br />
        <RecipeList />
      </Container>
    </>
  );
}

export default Recipe;

import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Search from './Search';
import RecipeList from './RecipeList';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import RecipeService from '../Services/RecipeService';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    flexDirection: "row",
  }
}));

function Recipe() {
  const [recipes, setRecipes] = useState(null);
  const [state, setState] = React.useState({
    checkVegetarian: true,
    checkVegan: true,
    checkGlutenFree: true,
  });
  const classes = useStyles();
  const searchFilters = {
    searchText: "",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  }

  // Handles changing checkboxes
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.name)
  };

  // Auto search for pasta on page load
  useEffect(() => {
    RecipeService.getRecipes('spaghetti').then(setRecipes);
  }, []);

  // Search function
  const sendSearchReq = (searchFilters) =>{
    RecipeService.getRecipes(searchFilters.searchText).then(res => {
      recipes = res;
      recipes.filter((recipe) => {
        if(searchFilters.vegetarian && !recipe.recipe.healthLabels.includes('Vegetarian')) return false;
        if(searchFilters.vegan && !recipe.recipe.healthLabels.includes('Vegan')) return false;
        if(searchFilters.glutenFree && !recipe.recipe.healthLabels.includes('Gluten-Free')) return false;
      })
     });
  }

  return (
    <>
    <br></br><br></br>
        <Container>
      <FormGroup className={classes.root}>
      <FormControlLabel
        control={<Checkbox name="checkVegetarian" checked={state.checkVegetarian} onChange={handleChange}/>}
        label="Vegetarian"
      />
            <FormControlLabel
        control={<Checkbox name="checkVegan" checked={state.checkVegan} onChange={handleChange}/>}
        label="Vegan"
      />
            <FormControlLabel
        control={<Checkbox name="checkGlutenFree" checked={state.checkGlutenFree} onChange={handleChange}/>}
        label="Gluten-Free"
      />
      <Search isLarge={true} onSubmit={(searchText) => RecipeService.getRecipes(searchText).then(setRecipes)} placeholder='Search Recipes e.g. pasta'/>
      </FormGroup>
        <br />
        <RecipeList recipes={recipes} />
      </Container>
    </>
  );
}

export default Recipe;

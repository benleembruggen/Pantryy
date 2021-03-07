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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import AddItemModal from './AddItemModal';


const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  loading: {
    zIndex: theme.zIndex.drawer + 1,
  }
}));

function Recipe(props) {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("spaghetti")
  const [checkboxStates, setCheckboxStates] = React.useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });
  const classes = useStyles();

  // Handles changing checkboxes
  const handleChange = (event) => {
    const newCheckboxState = { ...checkboxStates, [event.target.name]: event.target.checked };
    setCheckboxStates(newCheckboxState);
    sendSearchReq(searchText, newCheckboxState);
  };

  // Auto search for pasta on page load
  useEffect(() => {
    sendSearchReq('spaghetti', checkboxStates)
    //RecipeService.getRecipes('spaghetti').then(setRecipes);
  }, []);

  // Search function
  const sendSearchReq = (searchText, searchFilters) => {
    setLoading(true);
    RecipeService.getRecipes(searchText).then(recipes => {
      const filteredRecipes = recipes.filter((recipe) => {
        if (searchFilters.vegetarian && !recipe.recipe.healthLabels.includes('Vegetarian')) return false;
        if (searchFilters.vegan && !recipe.recipe.healthLabels.includes('Vegan')) return false;
        if (searchFilters.glutenFree && !recipe.recipe.healthLabels.includes('Gluten-Free')) return false;
        return true;
      });
      setRecipes(filteredRecipes);
      setLoading(false);
    });
  }

  return (
    <>
      <br></br><br></br>
      <Container>
        <FormGroup className={classes.root}>
          <FormControlLabel
            control={<Checkbox name="vegetarian" checked={checkboxStates.vegetarian} onChange={handleChange} />}
            label="Vegetarian"
          />
          <FormControlLabel
            control={<Checkbox name="vegan" checked={checkboxStates.vegan} onChange={handleChange} />}
            label="Vegan"
          />
          <FormControlLabel
            control={<Checkbox name="glutenFree" checked={checkboxStates.glutenFree} onChange={handleChange} />}
            label="Gluten-Free"
          />
          <Search isLarge={true} onSubmit={(searchText) => {
            setSearchText(searchText);
            sendSearchReq(searchText, checkboxStates);
          }} placeholder='Search Recipes e.g. pasta' />
          <Button onClick={props.onOpenShoppingList}> Open cart </Button>
        </FormGroup>
        <br />
        {isLoading ? <><CircularProgress /><br /><br /><br /><br /></> : <RecipeList recipes={recipes} />}
      </Container>
    </>
  );
}

export default Recipe;

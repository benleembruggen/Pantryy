import React from 'react';
import Container from '@material-ui/core/Container';
import Search from './Search';
import RecipeList from './RecipeList';

function Recipe() {
  return (
    <>
      <Container>
        <h1>Recipe Page</h1>
        <div>
          <Search isLarge={true} placeholder='Search Recipes' />
          <br />
          <RecipeList />
        </div>
      </Container>
    </>
  );
}

export default Recipe;

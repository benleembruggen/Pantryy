import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import RecipeModal from './RecipeModal';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import EcoIcon from '@material-ui/icons/Eco';
import { Tooltip } from '@material-ui/core';
import PantryService from '../Services/PantryService';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
  },
  gridList: {
    width: '100vw',
    height: '80vh',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  strongIcon: {
    color: 'rbga(255,255,255,1)',
  },
  bar: {
    textAlign: 'left',
  },
  underbar: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
}));

export default function RecipeList(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState('-1');
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    PantryService.getPantry().then((data) => {
      setPantry(data);
    });
  });

  if (!props.recipes) {
    return <p>Search for something!</p>;
  }
  if (props.recipes.length === 0) {
    return <p>Your search returned no results :(</p>;
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={4}>
        {props.recipes.map((tile, index) => (
          <GridListTile
            key={tile.recipe.image}
            onClick={() => {
              setOpenModal(`${index}`);
            }}
          >
            <RecipeModal
              open={openModal === `${index}`}
              onClose={() => {
                setOpenModal('-1');
                props.refreshCart();
              }}
              recipe={tile}
              pantry={pantry}
            />
            <img src={tile.recipe.image} alt={tile.recipe.label} />
            <GridListTileBar
              className={classes.bar}
              title={tile.recipe.label}
              titlePosition='top'
              subtitle={<span>by: {tile.recipe.source}</span>}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  href={tile.recipe.url}
                  target='_blank'
                >
                  <LinkIcon />
                </IconButton>
              }
            />
            <GridListTileBar
              className={classes.underbar}
              titlePosition='bottom'
              actionIcon={
                <>
                  {tile.recipe.healthLabels.includes('Vegan') ? (
                    <Tooltip title='Vegan' placement='top'>
                      <IconButton className={classes.strongIcon}>
                        <EcoIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                  {tile.recipe.healthLabels.includes('Vegetarian') &&
                  !tile.recipe.healthLabels.includes('Vegan') ? (
                    <Tooltip title='Vegetarian' placement='top'>
                      <IconButton className={classes.strongIcon}>V</IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                  {tile.recipe.healthLabels.includes('Gluten-Free') ? (
                    <Tooltip title='Gluten Free' placement='top'>
                      <IconButton className={classes.strongIcon}>GF</IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

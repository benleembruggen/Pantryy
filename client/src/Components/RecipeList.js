import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import EcoIcon from '@material-ui/icons/Eco'
import WifiIcon from '@material-ui/icons/Wifi'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    zIndex: 0
  },
  gridList: {
    width: '100vw',
    height: 400,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  strongIcon:{
    color: 'rbga(255,255,255,1)'
  },
  bar:{
    textAlign: 'left',
  },
  underbar:{
    backgroundColor: 'rgba(0,0,0,0)'
  }
}));

let tileData = [
  {
    img: 'https://media1.s-nbcnews.com/j/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.fit-2000w.jpg',
    title: 'Banana',
    source: 'Mark',
    url: 'https://google.com.au',
  },
]

export default function RecipeList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={4}>
        {props.recipes.map((tile) => (
          <GridListTile key={tile.recipe.image}>
            <img src={tile.recipe.image} alt={tile.recipe.label} />
            <GridListTileBar
            className={classes.bar}
              title={tile.recipe.label}
              titlePosition="top"
              subtitle={<span>by: {tile.recipe.source}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
            <GridListTileBar
            className={classes.underbar}
              titlePosition="bottom"
              actionIcon={
                <>
                  <IconButton className={classes.strongIcon}>
                    <EcoIcon />
                  </IconButton>
                  <IconButton className={classes.strongIcon}>
                    <WifiIcon />
                  </IconButton>
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  rootL: {
    padding: '2px 5px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
    borderRadius: 100,
  },
  rootS: {
    padding:'2px 5px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    margin: 'auto',
    borderRadius: 100,
  },
  input: {
    marginLeft: theme.spacing(1),
    padding: '0px',
    flex: 1,
  },
  iconL: {
    padding: 4,
  },
  iconS:{
    padding: 0,
  },
}));

export default function Search( props ) {
  const classes = useStyles();

  return (
    <Paper component="form" className={props.isLarge ? classes.rootL : classes.rootS}>
      <InputBase className={classes.input} placeholder={props.placeholder}/>
      <IconButton type="submit" className={props.isLarge ? classes.iconL : classes.iconS}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
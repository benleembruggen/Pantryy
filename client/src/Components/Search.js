import React, { useState } from 'react';
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
    borderRadius: 100,
    height: 35,
    margin: 'auto 2px',
    zIndex: 10,
  },
  rootS: {
    padding: '2px 5px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
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
  iconS: {
    padding: 0,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [inputText, setInputText] = useState([]);
  return (
    <Paper
      component='form'
      className={props.isLarge ? classes.rootL : classes.rootS}
    >
      <InputBase
        onChange={(event) => setInputText(event.target.value)}
        className={classes.input}
        placeholder={props.placeholder}
      />
      <IconButton
        onClick={() => props.onSubmit(inputText)}
        className={props.isLarge ? classes.iconL : classes.iconS}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

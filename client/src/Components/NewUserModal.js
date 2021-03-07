import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '30vh',
    justifyContent: 'center',
    margin: 'auto',
    width: `40vw`,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  amountDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  measure: {
    margin: 'auto 30px',
  },
}));

const NewUserModal = ({ open, onClose }) => {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <h2>
        <p>Welcome to pantryy</p>
      </h2>
      <p>Add items to your pantry using the menu on the right.</p>
      <p>The use your pantry to search for recipes</p>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      {body}
    </Modal>
  );
};

export default NewUserModal;

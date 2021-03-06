import React, { useState, useEffect, useContext } from 'react';
import Nav from './Nav';
import PantryService from '../Services/PantryService';
import { AuthContext } from '../Context/AuthContext';

const Pantry = (props) => {
  const [pantry, setPantry] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    PantryService.getPantry().then((data) => {
      setPantry(data.pantry);
      console.log(data.pantry);
    });
  }, []);

  return (
    <>
      <Nav />
      <h1>Pantry Page</h1>
    </>
  );
};

export default Pantry;

import React, { useState, useEffect, useContext } from 'react';
import Nav from './Nav';
import PantryService from '../Services/PantryService';
import { AuthContext } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pantry = (props) => {
  const [pantry, setPantry] = useState([]);
  const authContext = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    PantryService.postItem(query).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        PantryService.getPantry().then((getData) => {
          setPantry(getData.pantry);
        });
      } else if (message.msgBody === 'UnAuthorized') {
        authContext.setUser({ username: '', role: '' });
        authContext.setIsAuthenticated(false);
      }
    });
    setSearch('');
    setQuery('');
  };

  useEffect(() => {
    PantryService.getPantry().then((data) => {
      setPantry(data.pantry);
      console.log(data.pantry);
    });
  }, []);

  return (
    <div>
      <Nav />
      <h1>Pantry Page</h1>
      <form onSubmit={getSearch} className='input-group mb-3'>
        <input
          className='form-control'
          type='text'
          value={search}
          onChange={updateSearch}
          placeholder='Add item to pantry'
        />
        <div className='input-group-append'>
          <button className='btn btn-primary' type='submit'>
            +
          </button>
        </div>
      </form>
      <div
        className='card-columns'
        style={{
          columnCount: '5',
        }}
      >
        {pantry.map((item) => (
          <div className='card'>
            <img className='card-img-top' src={item.img} alt={item.name} />
            <div className='card-body'>
              <h5 className='card-title'>{item.name}</h5>
              <p className='card-text'>{item.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry;

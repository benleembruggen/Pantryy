import React, { useState, useEffect, useContext } from 'react';
import Nav from './Nav';
import PantryService from '../Services/PantryService';
import { AuthContext } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pantry = (props) => {
  const [pantry, setPantry] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    PantryService.getPantry().then((data) => {
      setPantry(data.pantry);
      console.log(data.pantry);
    });
  }, []);

  const mockData = [
    {
      name: 'apple',
      id: 123456,
      img:
        'https://i.pinimg.com/originals/9d/c2/41/9dc2417e68967c6e949d7665b822f020.jpg',
    },
    {
      name: 'banana',
      id: 654321,
      img:
        'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg',
    },
    {
      name: 'flour',
      id: 162534,
      img:
        'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2019/08/homemade-cake-flour-3.jpg',
    },
  ];

  return (
    <div>
      <Nav />
      <h1>Pantry Page</h1>
      <div className='card-columns'>
        {mockData.map((item) => (
          <div className='card'>
            <img
              className='card-img-top'
              src={item.img}
              alt={item.name}
            />
            <div className='card-body'>
              <h5 className='card-title'>{item.name}</h5>
              <p className='card-text'>{item.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default Pantry;

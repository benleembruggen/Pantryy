import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/pantry'>
          <li>Pantry</li>
        </Link>
        <Link to='/recipe'>
          <li>Recipe</li>
        </Link>
        <Link to='/login'>
          <li>Login</li>
        </Link>
        <Link to='/register'>
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;

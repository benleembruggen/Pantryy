import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
        <ul>
            <Link to="/">
                <li>Home</li>
            </Link>
            <Link to="/pantry">
                <li>Pantry</li>
            </Link>
            <Link to="/recipe">
                <li>Recipe</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;

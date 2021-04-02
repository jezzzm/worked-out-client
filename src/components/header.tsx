import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <ul>
      <li>
        <Link to="/add">Add</Link>
      </li>
      <li>
        <Link to="/routines">Routines</Link>
      </li>
    </ul>
  </nav>
);

export default Header;
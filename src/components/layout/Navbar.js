import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navigation-bar">
      <h3>Title</h3>
      <ul className="navigation-bar__ul">
        <li>
          <Link to='/' className="list">Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar

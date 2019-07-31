import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/loginActions';
import history from '../../history';

const Navbar = ({logout}) => {

  const onLogout = () => {
    logout();
    history.push('/');
    window.location.reload();
  }

  return (
    <div className="navigation-bar">
      <h3>Title</h3>
      <ul className="navigation-bar__ul">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <a href='#!' onClick={onLogout}>Logout</a>
        </li>
        <li>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
      </ul>
    </div>
  )
}

export default connect(null, {logout})(Navbar)

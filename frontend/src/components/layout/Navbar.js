import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/loginActions';
import history from '../../history';
import logo from '../../media/noble-leaders-logo.png';


const Navbar = ({ login: {isAuthenticated}, logout }) => {

  const onLogout = () => {
    logout();
    history.push('/');
    window.location.reload();
  }

  const loggedInLinks = (
    <Fragment>
      
      
      <li className="nav-logo">
        <Link to='/'><div className="logo-img"><img src={logo} alt=""/></div></Link>
      </li>
      <li className="nav-about">
        <Link to='/about'>About</Link>
      </li>
     
      <li className="nav-leaderboard">
        <Link to='/leaderboard'>Leaderboard</Link>
      </li>

      <li className="nav-logout">
        <a href='#!' onClick={onLogout}>Logout</a>
      </li>
      <li className="nav-profile">
        <Link to='/profile'><i className="fa fa-user-circle"></i></Link>
      </li>
    </Fragment>
  )

  const notLoggedLinks = (
    <Fragment>
      <li className="nav-logo">
        <Link to='/'><div className="logo-img"><img src={logo} alt=""/></div></Link>
      </li>
      <li className="nav-about">
        <Link to='/about'>About</Link>
      </li>
      <li className="nav-leaderboard">
        <Link to='/leaderboard'>Leaderboard</Link>
      </li>

      <li className="nav-register">
        <Link to='/register'>Register</Link>
      </li>
      <li className="nav-login">
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className="navigation-bar">
      
      <ul className="navigation-bar__ul container">
        {isAuthenticated ? loggedInLinks : notLoggedLinks}
      </ul>
    </div>
  )
}
const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {logout})(Navbar)

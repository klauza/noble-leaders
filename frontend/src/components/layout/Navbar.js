import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/loginActions';
import history from '../../history';


const Navbar = ({ login: {isAuthenticated}, logout }) => {

  const onLogout = () => {
    logout();
    history.push('/');
    window.location.reload();
  }

  const loggedInLinks = (
    <Fragment>
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
        <Link to='/leaderboard'>Leaderboard</Link>
      </li>

      <li>
        <a href='#!' onClick={onLogout}>Logout</a>
      </li>
    </Fragment>
  )

  const notLoggedLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/leaderboard'>Leaderboard</Link>
      </li>

      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className="navigation-bar">
      <h3>Title</h3>
      <ul className="navigation-bar__ul">
        {isAuthenticated ? loggedInLinks : notLoggedLinks}
      </ul>
    </div>
  )
}
const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {logout})(Navbar)

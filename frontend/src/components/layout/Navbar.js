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

  const toggleNavbar = () => {
    let storeLis = '';
    const navMobileContainer = document.querySelector('.mobile-links-container');

    // show / hide
    if(navMobileContainer.classList.contains('show')){ 
      navMobileContainer.classList.remove('show');
      navMobileContainer.classList.remove('slide');

      // animate off
    } 
    else {
      navMobileContainer.classList.add('show');

      // put animation
      setTimeout(() => {
        navMobileContainer.classList.add('slide');
      }, 1);
    }

    ( navMobileContainer.classList.contains('show') && (storeLis = Array.from(document.querySelectorAll('.nav-item'))) );

    if(storeLis !== ''){
      // remove not visible nav-items
      storeLis.splice(1, 4); 

      // add listeners
      storeLis.forEach(li => li.addEventListener("click", clearEventAndCloseBurger));
    }
  }



  const clearEventAndCloseBurger = () => {
    const navMobileContainer = document.querySelector('.mobile-links-container');
    navMobileContainer.classList.remove('show');   // hide <ul> on .nav-item click
    navMobileContainer.classList.remove('slide'); // also remove animation class
    // remove listeners
    document.querySelectorAll('.nav-item').forEach((li)=>{li.removeEventListener('click', toggleNavbar, false)});
    document.querySelectorAll('.nav-item').forEach((li)=>{li.removeEventListener('click', clearEventAndCloseBurger, false)});
    // console.log('cleared and closed');
  }

  const loggedInLinks = (
    <Fragment>
      <li className="nav-item nav-about">
        <Link to='/about'>About</Link>
      </li>
     
      <li className="nav-item nav-leaderboard">
        <Link to='/leaderboard'>Leaderboard</Link>
      </li>

      <li className="nav-item nav-logout">
        <a href='#!' onClick={onLogout}>Logout</a>
      </li>
      <li className="nav-item nav-profile">
        <Link to='/profile'><i className="fa fa-user-circle"></i></Link>
      </li>
    </Fragment>
  )

  const notLoggedLinks = (
    <Fragment>
      <li className="nav-item nav-about">
        <Link to='/about'>About</Link>
      </li>
      <li className="nav-item nav-leaderboard">
        <Link to='/leaderboard'>Leaderboard</Link>
      </li>

      <li className="nav-item nav-register">
        <Link to='/register'>Register</Link>
      </li>
      <li className="nav-item nav-login">
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className="navigation-bar">
      
      <ul className="navigation-bar__ul container">
        <li className="nav-item nav-logo">
          <Link to='/'><div className="logo-img"><img src={logo} alt=""/></div></Link>
        </li>
        {/* tablet & pc links */}
        {isAuthenticated ? loggedInLinks : notLoggedLinks} 

        {/* mobile links */}
        <i className="burger fa fa-align-justify" onClick={toggleNavbar}></i> 
        <div className="mobile-links-container">           
          {isAuthenticated ? loggedInLinks : notLoggedLinks}
        </div>

      </ul>
    </div>
  )
}
const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {logout})(Navbar)

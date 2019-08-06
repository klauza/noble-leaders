import React, {Fragment, useState, useEffect} from 'react';
import history from '../../history';
import {connect} from 'react-redux';
import {userLogin, clearError} from '../../actions/loginActions';
import {setAlert} from '../../actions/alertActions';
import Loader from '../layout/Loader';

const Login = ({ login: {error, isAuthenticated}, userLogin, clearError, setAlert }) => {

  useEffect(() => {
    
    if(localStorage.token && localStorage.token !== 'undefined'){
      history.push('/profile');  //redirect to profile
    }
    // console.log(error);
    if(error && error !== null){
      
      if(error === 'Invalid Password'){
        setAlert("Invalid Password", "danger");
        clearError();
      } else {
        if(error[0].msg){
          setAlert(error[0].msg, "danger");
          clearError();
        } else{
        return 
      } 
      }
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login submit');
    if(email === '' || password === ''){
      setAlert("Inputs cant be empty", "danger");
    } else {
      
      userLogin({
        email,
        password
      })
    }
    
  }

  return (
    <Fragment>
      {isAuthenticated ? <Loader /> : 
      <div className="container auth">

        <form className="auth__sign-form" onSubmit={onSubmit}>
          <h2 className="">Sign In</h2>

          <div className="input-field">
            <input id="email" type="text" name="email" value={email} placeholder="Email" onChange={onChange} />
          </div>

          <div className="input-field">
            <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={onChange} />
          </div>

          <div className="input-field">
            <button className="btn-sign">Login</button>
          </div>

        </form>
          
      </div>
      }
    </Fragment>
  )
}
const mapStateToProps = state => ({
  login: state.login,
  alert: state.alert
})
export default connect(mapStateToProps, {userLogin, clearError, setAlert})(Login)

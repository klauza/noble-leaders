import React, {useState, useEffect} from 'react';
import history from '../../history';
import {connect} from 'react-redux';
import {userLogin, clearError} from '../../actions/loginActions';
import {setAlert} from '../../actions/alertActions';

const Login = ({ login: {error, isAuthenticated}, userLogin, clearError, setAlert }) => {

  useEffect(() => {
    if(localStorage.token && localStorage.token !== 'undefined'){
      history.push('/profile');  //redirect to profile
    }
    // console.log(error);
    if(error !== null){
      
      if(error === 'Invalid Password'){
        setAlert("Invalid Password", "danger");
        clearError();
      } else {
        if(error[0].msg === 'Please include a valid email'){
          setAlert("Please include a valid email", "danger");
          clearError();
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
    <div className="container auth">

      <form className="auth__sign-form" onSubmit={onSubmit}>
        <h2 className="">Sign In</h2>

        <div className="input-field">
          <input id="email" type="text" name="email" value={email} placeholder="Email" onChange={onChange} required />
        </div>

        <div className="input-field">
          <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={onChange} required />
        </div>

        <div className="input-field">
          <button className="btn-sign">Login</button>
        </div>

      </form>
        
    </div>
  )
}
const mapStateToProps = state => ({
  login: state.login,
  alert: state.alert
})
export default connect(mapStateToProps, {userLogin, clearError, setAlert})(Login)

import React, {useState, useEffect} from 'react';
import history from '../../history';
import {connect} from 'react-redux';
import {userRegister, clearError} from '../../actions/loginActions';
import {setAlert} from '../../actions/alertActions';

const Register = ({ login: {error, isAuthenticated}, userRegister, clearError, setAlert }) => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  useEffect(() => {
    if(localStorage.token && localStorage.token !== 'undefined'){
      history.push('/profile');  //redirect to profile
    }

    if(error === 'User already exists'){
      console.log('user already exists');
      setAlert("User already exists", "danger");
      clearError();
    } else 
      if (error === 'Email already exists'){
        console.log('Email already exists');
        setAlert("Email already exists", "danger");
        clearError();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const {name, email, password, password2} = user;

  const onChange = (e) => {
    setUser({
      ...user, // current value
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(user.password !== user.password2){
      setAlert("Passwords must be equal", "danger");

    } else{
      userRegister({
        name, 
        email, 
        password
      });

      console.log('Register submitted');
    }
  }

  return (
       <div className="container auth">

          <form className="auth__sign-form" onSubmit={onSubmit}>
            <h2 className="">Dear Dignified Sir/Lady <br/>
            register yourself</h2>

            <div className="input-field">
              <input id="name" type="text" name="name" value={name} placeholder="Name" onChange={onChange} required />
            </div>

            <div className="input-field">
              <input id="email" type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
            </div>

            <div className="input-field">
              <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={onChange} required minLength="6"/>
            </div>

            <div className="input-field">
              <input id="password2" type="password" name="password2" value={password2} placeholder="Repeat password" onChange={onChange} required />
            </div>

            <div className="input-field">
              <button className="btn-sign">Register</button>
            </div>

          </form>
          
        </div>
  )
}
const mapStateToProps = state => ({
  login: state.login,
  alert: state.alert
})
export default connect(mapStateToProps, {userRegister, clearError, setAlert})(Register)

import React, {useState, useEffect} from 'react';
import history from '../../history';
import {connect} from 'react-redux';
import {userRegister} from '../../actions/loginActions';

const Register = ({ login: {error, isAuthenticated}, userRegister }) => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  useEffect(() => {
    if(localStorage.token){
      history.push('/profile');  //redirect to profile
    }

    if(error === 'User already exists'){
      console.log('user already exists');
    }
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
      
      console.log('passwords must be equal');

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
  login: state.login
})
export default connect(mapStateToProps, {userRegister})(Register)

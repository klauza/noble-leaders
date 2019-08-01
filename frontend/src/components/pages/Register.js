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
      history.push('/');  //redirect to dashboard
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
    userRegister({
      name, 
      email, 
      password
    });
    console.log('Register submitted');
  }

  return (
       <div className="container auth">

          <form className="auth__sign-form" onSubmit={onSubmit}>
            <h2 className="mt-5">Dear Dignified Sir/Lady</h2>
            <h2 className="">register yourself</h2>

            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" value={name} placeholder="name" onChange={onChange} required />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={email} placeholder="email" onChange={onChange} required />
            </div>

            <div className="input-field">
              <label htmlFor="password">password</label>
              <input id="password" type="password" name="password" value={password} placeholder="password" onChange={onChange} required />
            </div>

            <div className="input-field">
              <label htmlFor="password2">repeat password</label>
              <input id="password2" type="password" name="password2" value={password2} placeholder="repeat password" onChange={onChange} required />
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

import React, {useState, useEffect} from 'react';
import history from '../../history';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/loginActions';

const Login = ({ login: {error, isAuthenticated}, userLogin }) => {

  useEffect(() => {
    if(localStorage.token){
      history.push('/');  //redirect to dashboard
    }

    if(error === 'Invalid Credentials'){
      console.log('invalid credentials');
    }
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
      console.log("Inputs can't be empty");
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
        <h2 className="mt-5">Sign In</h2>

        <div className="input-field">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" name="email" value={email} placeholder="email" onChange={onChange} required />
        </div>

        <div className="input-field">
        <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={password} placeholder="password" onChange={onChange} required />
        </div>

        <div className="input-field">
          <button className="btn-sign">Login</button>
        </div>

      </form>
        
    </div>
  )
}
const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {userLogin})(Login)

import React from 'react';

const Login = () => {
  return (
    <div className="container auth">

      <form className="auth__sign-form">
        <h2 className="mt-5">Sign In</h2>

        <div className="input-field">
          <input type="text" id="email" placeholder="user name"/>
        </div>

        <div className="input-field">
          <input type="password" id="password" placeholder="password"/>
        </div>

        <div className="input-field">
          <button className="btn-sign">Login</button>
        </div>

      </form>
        
    </div>
  )
}

export default Login

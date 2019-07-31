import React from 'react';

const Register = () => {
  return (
       <div className="container auth">

          <form className="auth__sign-form">
            <h2 className="mt-5">Register</h2>

            <div className="input-field">
              <input type="text" id="username" placeholder="user name" />
            </div>

            <div className="input-field">
              <input type="email" id="email" placeholder="email" />
            </div>

            <div className="input-field">
              <input type="password" id="password" placeholder="password" />
            </div>

            <div className="input-field">
              <input type="password" id="password" placeholder="repeat password" />
            </div>

            <div className="input-field">
              <button className="btn-sign">Register</button>
            </div>

          </form>
          
        </div>
  )
}

export default Register

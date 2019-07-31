import React, {useState} from 'react';

const Login = () => {

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
  }

  return (
    <div className="container auth">

      <form className="auth__sign-form" onSubmit={onSubmit}>
        <h2 className="mt-5">Sign In</h2>

        <div className="input-field">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" name="email" value={email} placeholder="email" onChange={onChange} />
        </div>

        <div className="input-field">
        <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={password} placeholder="password" onChange={onChange} />
        </div>

        <div className="input-field">
          <button className="btn-sign">Login</button>
        </div>

      </form>
        
    </div>
  )
}

export default Login

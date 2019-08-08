import React, {Fragment, useState, useEffect} from 'react';
import history from '../../history';
import {connect} from 'react-redux';
import {userRegister, clearError} from '../../actions/loginActions';
import {setAlert} from '../../actions/alertActions';
import Loader from '../layout/Loader';
import registerCallbackImg from '../../media/registerCallbackImg.jpg'

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
    
    if(error !== null){

      if(error === 'User already exists'){
        console.log('user already exists');
        setAlert("User already exists", "danger");
        clearError();
      } else 
        if (error === 'Email already exists'){
          console.log('Email already exists');
          setAlert("Email already exists", "danger");
          clearError();
      } else 
      if(error[0].msg){
        console.log(error[0].msg);
        setAlert(error[0].msg, "danger");
        clearError();
      } 
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
    // here we can make use name REGEX validation on front end side

    if(user.password !== user.password2){
      setAlert("Passwords must be equal", "danger");

    } else{
      let highscore = 0;
      let quote = "-";
      
      async function fetchAvatar(){
        try{
          const res = await fetch('https://api.thecatapi.com/v1/images/search');
          const data = await res.json();
          return data;
          
        } catch(err){
          // console.log('avatar wasnt fetched, using callback');
          const data = registerCallbackImg;
          return data;
        }
      }
        
      fetchAvatar()
        .then((data) => {
          let avatar;
          try{
            (data[0].url ? avatar = data[0].url : avatar = data)
          }catch(err){
          }
         
          userRegister({
            name, 
            email, 
            password,
            highscore,
            quote,
            avatar
          });
        })

        
      // console.log('Register submitted');
    }
  }

  return (
    <Fragment>
      {isAuthenticated ? <Loader /> : 
        <div className="container auth">

          <form className="auth__sign-form" onSubmit={onSubmit}>
            <h2 className="">Dear Dignified user <br/>
            register yourself</h2>

            <div className="input-field">
              <input id="name" type="text" name="name" value={name} placeholder="Name" onChange={onChange} />
            </div>

            <div className="input-field">
              <input id="email" type="text" name="email" value={email} placeholder="Email" onChange={onChange} />
            </div>

            <div className="input-field">
              <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={onChange} minLength="6"/>
            </div>

            <div className="input-field">
              <input id="password2" type="password" name="password2" value={password2} placeholder="Repeat password" onChange={onChange} />
            </div>

            <div className="input-field">
              <button className="btn-sign">Register</button>
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
export default connect(mapStateToProps, {userRegister, clearError, setAlert})(Register)

import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import Leaderboard from './components/pages/Leaderboard';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <div className="App">
      
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/about" component={About} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
            
          </div>
          
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

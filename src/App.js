import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import Profile from './components/pages/Profile';

import Register from './components/pages/Register';
import Login from './components/pages/Login';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="App">
          

          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/about" component={About} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

          </Switch>
          
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

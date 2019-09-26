import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import Leaderboard from './components/pages/Leaderboard';
import UserPage from './components/pages/UserPage';
import Forum from './components/pages/Forum';
import ForumContentThread from './components/pages/ForumContentThread';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import setAuthToken from './utils/setAuthToken';

import ActorGame from './components/games/actor-quiz/ActorGame';
import Snake from './components/games/snake/Snake';
import RevealCards from './components/games/reveal-cards/RevealCards';
import BuyGame from './components/pages/BuyGame';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {


  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Alert />
          <div className="App">
      
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/about" component={About} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/user/:username" component={UserPage} />
              <Route exact path="/forum" component={Forum} />
              <Route exact path="/forum/:thread" component={ForumContentThread} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/actor-game" component={ActorGame} />
              <Route exact path="/snake" component={Snake} />
              <Route exact path="/reveal-cards" component={RevealCards} />
              <Route exact path="/buy-game" component={BuyGame} />
            </Switch>
            
          </div>
          
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

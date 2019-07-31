import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="App">
          

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
          
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

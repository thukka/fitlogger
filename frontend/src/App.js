import React from 'react';
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatPage from './components/StatPage';

const App = () => {

  return (
    <Router>

      <Switch>
        <Route path='/frontpage'>
          <FrontPage />
        </Route>
        <Route path='/stats'>
          <StatPage />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
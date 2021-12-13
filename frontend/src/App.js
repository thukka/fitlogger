import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatPage from './components/StatPage';
import Notification from './components/Notification';

const App = () => {

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  console.log('user: ', user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const SetErrorMessage = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return user !== null ? (
    <Switch>
      <Route path='/frontpage'>
        <FrontPage user={user} />
      </Route>
      <Route path='/stats'>
        <StatPage />
      </Route>
      <Route path='/'>
        {user !== null ? <Redirect to='/frontpage' /> : <LoginPage setUser={setUser} />}
      </Route>
    </Switch>
  ) : (
    <>
      {error ? <Notification error={error} /> : null}
      <LoginPage setUser={setUser} SetErrorMessage={SetErrorMessage} />
    </>
  );
};

export default App;
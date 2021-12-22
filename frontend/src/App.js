import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatPage from './components/StatPage';
import Notification from './components/Notification';

const App = () => {

  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const setNotificationMessage = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
      setIsError(false);
    }, 5000);
  };

  return user !== null ? (
    <Switch>
      <Route path='/frontpage'>
        {notification ? <Notification error={isError} notification={notification} /> : null}
        <FrontPage user={user} setNotificationMessage={setNotificationMessage} />
      </Route>
      <Route path='/stats'>
        <StatPage user={user} />
      </Route>
      <Route path='/'>
        {user !== null ? <Redirect to='/frontpage' /> : <LoginPage setUser={setUser} />}
      </Route>
    </Switch>
  ) : (
    <>
      {notification ? <Notification error={isError} notification={notification} /> : null}
      <LoginPage setUser={setUser} setNotificationMessage={setNotificationMessage} setIsError={setIsError} />
    </>
  );
};

export default App;
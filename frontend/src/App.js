import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatPage from './components/StatPage';
import Notification from './components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';

const App = () => {

  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);
  const user = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
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
        <FrontPage setNotificationMessage={setNotificationMessage} />
      </Route>
      <Route path='/stats'>
        <StatPage />
      </Route>
      <Route path='/'>
        {user !== null ? <Redirect to='/frontpage' /> : <LoginPage />}
      </Route>
    </Switch>
  ) : (
    <>
      {notification ? <Notification error={isError} notification={notification} /> : null}
      <LoginPage setNotificationMessage={setNotificationMessage} setIsError={setIsError} />
    </>
  );
};

export default App;
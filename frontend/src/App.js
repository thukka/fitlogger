import React, { useEffect } from 'react';
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatPage from './components/StatPage';
import Notification from './components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';

const App = () => {
  const selectorNotification = state => state.notification.message;
  const selectorUser = state => state.user;
  const notification = useSelector(selectorNotification);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  return user.username !== null ? (
    <Switch>
      <Route path='/frontpage'>
        {notification ? <Notification /> : null}
        <FrontPage />
      </Route>
      <Route path='/stats'>
        <StatPage />
      </Route>
      <Route path='/'>
        <Redirect to='/frontpage' />
      </Route>
    </Switch>
  ) : (
    <>
      {notification ? <Notification /> : null}
      <LoginPage />
    </>
  );
};

export default App;
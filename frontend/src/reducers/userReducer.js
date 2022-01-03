import loginUser from '../services/login';
/* import { setNotification } from './notificationReducer'; */
/* import setNotificationMessage from '../utils/notification'; */
import { setNotification, resetNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user;
  case 'LOG_OUT':
    return null;
  default:
    return state;
  }
};

export const setUser = (user) => {
  return ({
    type: 'SET_USER',
    user: { ...user }
  });
};

export const logUser = (email, password) => {
  return async dispatch => {
    try {
      const userData = await loginUser(email, password);
      window.localStorage.setItem('loggedUser', JSON.stringify(userData));
      dispatch(setUser(userData));
    } catch (err) {
      let errMsg = err.response?.data.error;

      if (errMsg === undefined) {
        errMsg = err.message;
      }

      dispatch(setNotification(errMsg, true));
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };
};

export const logOut = () => {
  return ({
    type: 'LOG_OUT'
  });
};

export default userReducer;
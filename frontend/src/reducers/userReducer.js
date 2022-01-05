import loginUser from '../services/login';
import { timerNotification } from './notificationReducer';

const initialState = {
  name: null,
  token: null,
  username: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user;
  case 'LOG_OUT':
    return { ...initialState };
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

      dispatch(timerNotification(errMsg, true));
    }
  };
};

export const logOut = () => {
  return ({
    type: 'LOG_OUT'
  });
};

export default userReducer;
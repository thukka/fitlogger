import loginUser from '../services/login';

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
    const userData = await loginUser(email, password);
    window.localStorage.setItem('loggedUser', JSON.stringify(userData));
    dispatch(setUser(userData));
  };
};

export const logOut = () => {
  return ({
    type: 'LOG_OUT'
  });
};

export default userReducer;
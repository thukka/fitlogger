const initialState = {
  message: null,
  isError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.message, isError: action.error };
  case 'RESET_NOTIFICATION':
    return { message: null, isError: false };
  default:
    return state;
  }
};

export const resetNotification = () => {
  return({
    type: 'RESET_NOTIFICATION'
  });
};

export const setNotification = (message, isError) => {
  return ({
    type: 'SET_NOTIFICATION',
    message: message,
    error: isError ? isError : false
  });
};

export const timerNotification = (message, isError) => {
  return async dispatch => {
    dispatch(setNotification(message, isError));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 4000);
  };
};

export default reducer;
import userReducer from './userReducer';
import deepFreeze from 'deep-freeze';

describe('userReducer', () => {
  const state = {
    name: null,
    token: null,
    username: null
  };

  test('returns new state with action SET_USER', () => {
    const action = {
      type: 'SET_USER',
      user: {
        name: 'testi',
        token: 'token123',
        username: 'testi'
      }
    };

    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toEqual(action.user);
  });

  test('returns new state with action LOG_OUT', () => {
    const action = {
      type: 'SET_USER',
      user: {
        name: 'testi',
        token: 'token123',
        username: 'testi'
      }
    };

    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toEqual(action.user);

    const logOutAction = {
      type: 'LOG_OUT'
    };

    const stateAfterLogOut = userReducer(state, logOutAction);
    expect(stateAfterLogOut).toEqual(state);
  });
});
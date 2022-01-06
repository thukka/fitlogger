import notificationReducer from './notificationReducer';
import deepFreeze from 'deep-freeze';

describe('notificationReducer', () => {
  const state = {
    message: null,
    isError: false
  };

  test('returns new state with action SET_NOTIFICATION', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      message: 'hello world',
      error: false
    };
    deepFreeze(state);

    const newState = notificationReducer(state, action);
    expect(newState.message).toBe('hello world');
    expect(newState.isError).toBe(false);
    const errorAction = { ...action, error: true };
    const stateAfterError = notificationReducer(state, errorAction);
    expect(stateAfterError.isError).toBe(true);
  });

  test('state is reset with action RESET_NOTIFICATION', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      message: 'hello world',
      error: true
    };
    deepFreeze(state);

    const newState = notificationReducer(state, action);
    expect(newState.message).toBe('hello world');
    expect(newState.isError).toBe(true);
    const resetNotification = {
      type: 'RESET_NOTIFICATION'
    };
    const stateAfterReset = notificationReducer(state, resetNotification);
    expect(stateAfterReset).toStrictEqual(state);
  });
});
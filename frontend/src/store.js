import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

store.subscribe(() => {
  const storeNow = store.getState();
  console.log('storenow ', storeNow);
});

export default store;
import { createStore, applyMiddleware } from 'redux';
import { composeWidthDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWidthDevTools(applyMiddleware(...middleware))
);

export default store;
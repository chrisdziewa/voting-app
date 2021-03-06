import React from 'react';
import Bootstrap from 'bootstrap';
import style from '../styles/style';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import logger from 'redux-logger';
import rootReducer from './reducers';
import createRoutes from './routes';
import promise from 'redux-promise';
import CustomJs from '../js/custom';

let store;

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer, applyMiddleware(thunk, promise, logger())
  );
}

else {
  store = createStore(
    rootReducer, applyMiddleware(thunk, promise)
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={createRoutes(store)} />
  </Provider>
, document.querySelector('#container'));

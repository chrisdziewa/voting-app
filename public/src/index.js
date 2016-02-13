import React from 'react';
import style from '../styles/style';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import logger from 'redux-logger';
import rootReducer from './reducers';
import routes from './routes';
import promise from 'redux-promise';

const store = createStore(
  rootReducer, applyMiddleware(thunk, promise, logger())
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>  
, document.querySelector('#container'));
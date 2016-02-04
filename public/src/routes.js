import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Navbar from './components/navbar';
import HomePage from './components/home-page';
import SignupForm from './components/signup-form';
import LoginForm from './components/login-form';
import AllPolls from './containers/all-polls';
import NoMatch from './components/404';
import PollResult from './containers/poll-result';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/chart" component={PollResult} />
      <Route path="*" component={NoMatch}/>
    </Route>
);
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Navbar from './components/navbar';
import WelcomeBanner from './components/welcome-banner';
import SignupForm from './components/signup-form';
import LoginForm from './components/login-form';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={WelcomeBanner} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/login" component={LoginForm} />
    </Route>
);
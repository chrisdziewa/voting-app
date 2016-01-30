import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Navbar from './components/navbar';
import WelcomeBanner from './components/welcome-banner';
import SignupForm from './components/signup-form';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={WelcomeBanner} />
      <Route path="/signup" component={SignupForm} />
    </Route>
);
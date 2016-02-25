import React from 'react';
import { Route, IndexRoute } from 'react-router';
import actions from './actions/index';

import App from './components/app';
import Navbar from './components/navbar';
import HomePage from './components/home-page';
import SignupForm from './components/signup-form';
import LoginForm from './components/login-form';
import AllPolls from './containers/all-polls';
import NoMatch from './components/404';
import PollResult from './containers/poll-result';
import { getCurrentUser } from './actions/index';
import ProfilePage from './containers/ProfilePage';
import EditProfile from './components/forms/EditProfile';
import Users from './components/Users';
import CreatePollForm from './components/forms/CreatePollForm';

export default function createRoutes(store) {
  // Router Helper Functions
  function currentUserCheck() {
    store.dispatch(getCurrentUser());
  }

  return (
      <Route path="/" component={App} onEnter={currentUserCheck}>
        <IndexRoute component={HomePage} />
        <Route path="signup" component={SignupForm} />
        <Route path="login" component={LoginForm} />
        <Route path="chart" component={PollResult} />
        <Route path ="users" component={Users}>
         <Route path=":username" component={ProfilePage} />
         <Route path=":username/edit" component={EditProfile}/>
         <Route path=":username/create-poll" component={CreatePollForm} />
        </Route>
        <Route path="*" component={NoMatch}/>
      </Route>
  );
}

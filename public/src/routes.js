import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import Navbar from './components/navbar';
import HomePage from './containers/HomePage';
import SignupForm from './components/signup-form';
import LoginForm from './components/login-form';
import NoMatch from './components/404';
import PollResult from './containers/poll-result';
import { getCurrentUser, postError, showLoader, hideLoader } from './actions/index';
import ProfilePage from './containers/ProfilePage';
import EditProfile from './components/forms/EditProfile';
import Users from './components/Users';
import CreatePollForm from './components/forms/CreatePollForm';
import SinglePollPage from './containers/SinglePollPage';
import axios from 'axios';

export default function createRoutes(store) {
  // Router Helper Functions
  function currentUserCheck() {
    store.dispatch(getCurrentUser());
  }

  function checkAuth() {
    axios.get('http://localhost:3000/api/users/current')
      .then((response) => {

      }, () => {
        browserHistory.push('/');
      });
  }

  return (
      <Route path="/" component={App} onEnter={currentUserCheck}>
        <IndexRoute component={HomePage} />
        <Route path="signup" component={SignupForm} />
        <Route path="login" component={LoginForm} />
        <Route path="chart" component={PollResult} />
        <Route path="polls/create-poll" component={CreatePollForm} />
        <Route path ="users" component={Users}>
          <Route path="edit-user" component={EditProfile} onEnter={checkAuth}/>
          <Route path=":username/:question" component={SinglePollPage} />
          <Route path=":username" component={ProfilePage} />
        </Route>
        <Route path="*" component={NoMatch}/>
      </Route>
  );
}

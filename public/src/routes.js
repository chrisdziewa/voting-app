import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import {
  getCurrentUser,
  postError,
  showLoader,
  hideLoader,
  timeClearedMessages
} from './actions/index';
import axios from 'axios';

// Components
import App from './components/App';
import Navbar from './containers/Navbar';
import HomePage from './containers/HomePage';
import SignupForm from './components/forms/SignupForm';
import LoginForm from './components/forms/LoginForm';
import NoMatch from './components/404';
import PollResult from './components/polls/PollResult';
import ProfilePage from './containers/ProfilePage';
import EditProfile from './components/forms/EditProfile';
import CreatePollForm from './components/forms/CreatePollForm';
import SinglePollPage from './containers/SinglePollPage';
import UsersPage from './containers/UsersPage';
import PollsPage from './containers/PollsPage';

export default function createRoutes(store) {
  // Router Helper Functions
  function currentUserCheck() {
    store.dispatch(getCurrentUser());
  }

  function checkAuth() {
    axios.get('/api/users/current')
      .then((response) => {

      }, () => {
        browserHistory.push('/login');
        store.dispatch(postError('Must be logged in'));
        store.dispatch(timeClearedMessages());
      });
  }

  return (
      <Route path="/" component={App} onEnter={currentUserCheck}>
        <IndexRoute component={HomePage} />
        <Route path="polls" component={PollsPage}>
          <Route path="create-poll" component={CreatePollForm} onEnter={checkAuth} />
        </Route>
        <Route path ="users" component={UsersPage}>
          <Route path="signup" component={SignupForm} />
          <Route path="login" component={LoginForm} />
          <Route path="edit-user" component={EditProfile} onEnter={checkAuth}/>
          <Route path=":username/:question" component={SinglePollPage} />
          <Route path=":username" component={ProfilePage} />
        </Route>
        <Route path="*" component={NoMatch}/>
      </Route>
  );
}

import axios from 'axios';

import { browserHistory } from 'react-router';


// Poll Constants
export const FETCH_ALL_POLLS = 'FETCH_ALL_POLLS';
export const FETCH_SINGLE_POLL = 'FETCH_SINGLE_POLL';
export const FETCH_USER_POLLS = 'FETCH_USER_POLLS';
export const UPDATE_VOTES = 'UPDATE_VOTES';
export const SHOW_RESULT = 'SHOW_RESULT';
export const HIDE_ALL_RESULTS = 'HIDE_ALL_RESULTS';
export const CREATE_POLL = 'CREATE_POLL';
export const DELETE_POLL = 'DELETE_POLL';
export const GET_POLL_AUTHOR = 'GET_POLL_AUTHOR';

// Flash Constants
export const FLASH_ERROR = 'FLASH_ERROR';
export const FLASH_SUCCESS = 'FLASH_SUCCESS';
export const FLASH_INFO = 'FLASH_INFO';
export const DISMISS_FLASH = 'DISMISS_FLASH';
export const DISMISS_ALL_FLASH = 'DISMISS_ALL_FLASH';

// Auth Constants
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGGED_OUT = 'LOGGED_OUT';

// User Constants
export const UPDATE_USER = 'UPDATE_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';

// Loader Constants
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

const ROOT_URL = 'http://sondage-me.herokuapp.comapi';

// Loader Actions
export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

// Flash Actions
export function postError(payload) {
  return {
    type: FLASH_ERROR,
    payload
  }
}

export function postSuccess(payload) {
  return {
    type: FLASH_SUCCESS,
    payload
  };
}

export function postInfo(payload) {
  return {
    type: FLASH_INFO,
    payload
  };
}

export function dismissFlash(payload) {
  return {
    type: DISMISS_FLASH,
    payload
  }
}

export function dismissAllFlash() {
  return {
    type: DISMISS_ALL_FLASH
  }
}

export function timeClearedMessages() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(dismissAllFlash());
    }, 2000);
  }
}

// End Flash Actions


// Start Poll Actions
export function fetchAllPolls(username = null) {
  let url;
  if (username) {
    url = `${ROOT_URL}/users/${username}/polls`;
  }

  else {
    url = `${ROOT_URL}/polls`;
  }
  return (dispatch) => {
    dispatch(showLoader());
    const request = axios.get(url).then(response => {
      dispatch(hideLoader());
      if (response.status === 200) {
        dispatch(pollsRequest(response));
      }
    }).then((response) => {
      dispatch(hideAllResults());
    }, (response) => {
      if (response.status === 404 && typeof username !== null) {
        dispatch(postError(username + ' does not exist'));
      }
      else {
        dispatch(postError('Could not get Polls'));
      }
      browserHistory.push('/');
      dispatch(showLoader());
      dispatch(timeClearedMessages(dispatch));
    });
  }
}

function pollsRequest(polls) {
  return {
    type: FETCH_ALL_POLLS,
    payload: polls
  };
}

export function fetchSinglePoll(username, question) {
  return (dispatch) => {
    dispatch(showLoader());
    axios.get(`${ROOT_URL}/users/${username}/polls/${question}`).then(response => {
      if (response.status === 200) {
        dispatch(singlePollSuccess(response.data));
        dispatch(hideLoader());
      }
    }, () => {
      browserHistory.push('/');
      dispatch(postError('Poll not found'));
    });
  }
}

function singlePollSuccess(poll) {
  return {
    type: FETCH_SINGLE_POLL,
    payload: poll
  };
}

export function fetchUserPolls(username) {
  const request = axios.get(`${ROOT_URL}/users/${username}/polls`);
  return {
    type: FETCH_ALL_POLLS,
    payload: request
  }
}

export function getPollAuthor(pollId) {
  const request = axios.get(`${ROOT_URL}/polls/${pollId}`);
  return {
    type: GET_POLL_AUTHOR,
    payload: request
  }
}

export function updateVotes(id, choice) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/polls/${id}`, {choice: choice}).then(response => {
      if (response.status === 200) {
        dispatch(pollUpdated(response.data))
      }
    }, () => {
      // unsuccessful, show error
      console.log('error: ', response);
    });
  }
}

function hideAllResults() {
  return {
    type: HIDE_ALL_RESULTS
  }
}

function pollUpdated(poll) {
  return {
    type: UPDATE_VOTES,
    payload: poll
  }
}

export function createPoll(poll, username) {
  return (dispatch) => {
    dispatch(showLoader());
    axios.post(`${ROOT_URL}/polls`, poll).then(response => {
      if (response.status === 200) {
        dispatch(hideLoader());
        dispatch(pollCreated(response));
      }
    }).then(() =>  {
      dispatch(postSuccess('Your poll has been created successfully!'));
      browserHistory.push(`/users/${username}/${poll.question}`);
      dispatch(timeClearedMessages());
    }, (response) => {
      dispatch(hideLoader());
      dispatch(postError(response.data));
      dispatch(timeClearedMessages());
    });
  }
}

function pollCreated(poll) {
  return {
    type: CREATE_POLL,
    payload: poll
  }
}

export function deletePoll(pollId) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/polls/${pollId}`).then(response => {
      if (response.status === 200) {
        dispatch(pollDeleted(pollId));
        dispatch(postSuccess('Poll has been deleted'));
        dispatch(timeClearedMessages());
      }
    }, () => {
      dispatch(postError('Could not delete poll'));
    });
  }
}

function pollDeleted(pollId) {
  return {
    type: DELETE_POLL,
    payload: pollId
  }
}

// End Poll Actions

/* All User actions */
export function getAllUsers() {
  return (dispatch) => {
    dispatch(showLoader());
    axios.get(`${ROOT_URL}/users`).then(response => {
      dispatch(hideLoader());
      if (response.status === 200) {
        dispatch(getUsersSuccess(response.data));
      }
    }, () => {
      dispatch(hideLoader());
      dispatch(postError('Could not retrieve users'));
    });
  }
}

function getUsersSuccess(users) {
  return {
    type: GET_ALL_USERS,
    payload: users
  }
}

// End All User Actions

/* Signup actions */
export function signupUser(props) {
  return (dispatch) => {
    dispatch(showLoader());
    let request = `${ROOT_URL}/users`;
    axios.post(request, props).then(response => {
      if (response.status === 200) {
        dispatch(postSuccess(`Welcome, ${props.username}! Thanks for signing up for Sondage!`));
        dispatch(loginRequest(props, true));
        dispatch(timeClearedMessages());
      }
    }, (response) => {
      dispatch(hideLoader());
      dispatch(postError(response.data.message));
      dispatch(timeClearedMessages());
    });
  }
}


/* Authentication here */

// Check for existing user
    export function getCurrentUser() {
      return (dispatch) => {
        dispatch(showLoader());
        let request = `${ROOT_URL}/users/current`;
        axios.get(request).then(response => {
          dispatch(hideLoader());
          dispatch(loginSuccess(response.data));
          return true;
        }, (response) => {
          dispatch(hideLoader());
          // Error getting current user
          dispatch(loggedOut());
          return false;
        });
      }
    }

export function loginRequest(props, signup = false) {
    return (dispatch) => {
      if (!signup) {
        dispatch(showLoader());
      }
      axios.post(`${ROOT_URL}/authenticate`, props).then(response => {
        if (response.status == 200) {
          dispatch(postSuccess('Logged in succesfully'));
          browserHistory.push('/');
          dispatch(loginSuccess(response.data));
          dispatch(timeClearedMessages());
        }
      }, () => {
        dispatch(hideLoader());
        dispatch(loginError());
        dispatch(postError('Failed to log in'));
        dispatch(timeClearedMessages());
      });
    };
  }

  function loginSuccess(data) {
    return {
      type: LOGIN_SUCCESS,
      payload: data
    }
  }

  function loginError() {
    return {
      type: LOGIN_ERROR,
      payload: {
        loggedIn: false
      }
    }
  }

  export function logoutUser() {
    return (dispatch) => {
      dispatch(showLoader());
      let request = `${ROOT_URL}/authenticate`;
      axios.delete(request).then(response => {
        dispatch(loggedOut());
        browserHistory.push('/login');
        dispatch(postSuccess("Logout was successful. We hope to see you again soon!"));
        dispatch(hideLoader());
        dispatch(timeClearedMessages());
      }, () => {
        browserHistory.push('/');
        dispatch(postError("There was an error logging out"));
        dispatch(timeClearedMessages());
      });
    };
  }

  function loggedOut() {
    return {
      type: LOGGED_OUT
    }
  }

  function updateUser(user) {
    return {
      type: UPDATE_USER,
      payload: user
    }
  }

  export function updateAccount(id, props) {
    const url = `${ROOT_URL}/users/${id}`;
    return (dispatch) => {
      dispatch(showLoader());
      axios.put(url, props).then(response => {
        if (response.status === 200) {
          console.log(response);
          dispatch(updateUser(response.data));
          dispatch(getCurrentUser());
          dispatch(hideLoader());
          dispatch(postSuccess('Profile has been updated!'));
          dispatch(timeClearedMessages());
        }
      }, (error) => {
        dispatch(postError(error.data.message));
        dispatch(hideLoader());
        dispatch(timeClearedMessages());
      });
    }
  }

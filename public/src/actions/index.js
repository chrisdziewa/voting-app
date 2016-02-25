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

// Profile Constants
export const UPDATE_USER = 'UPDATE_USER';

// Loader Constants
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

const ROOT_URL = 'http://localhost:3000/api';

// Loader Actions
function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

function hideLoader() {
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

function timeClearedMessages(dispatch) {
  setTimeout(() => {
    dispatch(dismissAllFlash());
  }, 2000);
}

// End Flash Actions


// Start Poll Actions
export function fetchAllPolls() {
  return (dispatch) => {
    dispatch(showLoader);
    const request = axios.get(`${ROOT_URL}/polls`).then(response => {
      console.log(response);
      if (response.status === 200) {
        dispatch(pollsRequest(response));
      }
    }).then((response) => {
      dispatch(hideAllResults());
      dispatch(hideLoader());
    }, (response) => {
      dispatch(postError('Could not get Polls'));
      dispatch(hideLoader());
    });
  }
}

function pollsRequest(polls) {
  return {
    type: FETCH_ALL_POLLS,
    payload: polls
  };
}

export function fetchSinglePoll(pollId) {
  const request = axios.get(`${ROOT_URL}/polls/${pollId}`);
  return {
    type: FETCH_SINGLE_POLL,
    payload: request
  };
}

export function fetchUserPolls(username) {
  const request = axios.get(`${ROOT_URL}/users/${username}/polls`);
  return {
    type: FETCH_ALL_POLLS,
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
        browserHistory.push(`/users/${username}/${poll.question}`);
        dispatch(postSuccess('Your has been created successfully!'));
        timeClearedMessages(dispatch);
      }
    }, (response) => {
      dispatch(hideLoader());
      dispatch(postError(response.data));
      timeClearedMessages(dispatch);
    });
  }
}

function pollCreated(poll) {
  return {
    type: CREATE_POLL,
    payload: poll
  }
}

// End Poll Actions

/* Signup actions */
export function signupUser(props) {
  return (dispatch) => {
    dispatch(showLoader());
    let request = `${ROOT_URL}/users`;
    axios.post(request, props).then(response => {
      if (response.status === 200) {
        dispatch(hideLoader());
        dispatch(postSuccess(`Welcome, ${props.username}! Thanks for signing up for Sondage!`));
        dispatch(loginRequest(props));
        timeClearedMessages(dispatch);
      }
    }, (response) => {
      dispatch(hideLoader());
      dispatch(postError(response.data.message));
      timeClearedMessages(dispatch);
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
        }, (response) => {
          dispatch(hideLoader());
          // Error getting current user
          dispatch(loggedOut());
        });
      }
    }

export function loginRequest(props) {
    return (dispatch) => {
      dispatch(showLoader());
      axios.post(`${ROOT_URL}/authenticate`, props).then(response => {
        if (response.status == 200) {
          dispatch(hideLoader());
          dispatch(postSuccess('Logged in succesfully'));
          browserHistory.push('/');
          dispatch(loginSuccess(response.data));
          timeClearedMessages(dispatch);
        }
      }, () => {
        dispatch(hideLoader());
        dispatch(loginError());
        dispatch(postError('Failed to log in'));
        timeClearedMessages(dispatch);
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
        dispatch(hideLoader());
        dispatch(postSuccess("Logout was successful. We hope to see you again soon!"));
        timeClearedMessages(dispatch);
      }, () => {
        dispatch(hideLoader());
        browserHistory.push('/');
        dispatch(postError("There was an error logging out"));
        timeClearedMessages(dispatch);
      });
    };
  }

  function loggedOut() {
    return {
      type: LOGGED_OUT
    }
  }

  export function updateUser() {
    return {
      type: UPDATE_USER
    }
  }

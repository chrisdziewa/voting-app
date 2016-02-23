import axios from 'axios';

import { browserHistory } from 'react-router';

export const FETCH_ALL_POLLS = 'FETCH_ALL_POLLS';
export const FETCH_SINGLE_POLL = 'FETCH_SINGLE_POLL';
export const FETCH_USER_POLLS = 'FETCH_USER_POLLS';
export const UPDATE_VOTES = 'UPDATE_VOTES';

// Flash Actions
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

const ROOT_URL = 'http://localhost:3000/api';


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

// End Flash Actions

export function fetchAllPolls() {
  const request = axios.get(`${ROOT_URL}/polls`);
  return {
    type: FETCH_ALL_POLLS,
    payload: request
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
    type: FETCH_USER_POLLS,
    payload: request
  }
}

export function updateVotes(id, choice) {
  const request = axios.put(`${ROOT_URL}/polls/${id}`, {choice: choice});
  return {
    type:  UPDATE_VOTES,
    payload: request
  }
}

/* Signup actions */
export function signupUser(props) {
  return (dispatch) => {
    let request = `${ROOT_URL}/users`;
    axios.post(request, props).then(response => {
      if (response.status === 200) {
        dispatch(postSuccess(`Welcome, ${props.username}! Thanks for signing up for Sondage!`));
        dispatch(loginRequest(props));
        setTimeout(() => {
          dispatch(dismissAllFlash());
        }, 2500);
      }
    }, (response) => {
      dispatch(postError(response.data.message));
        setTimeout(() => {
          dispatch(dismissAllFlash());
        }, 2500);
    });
  }
}

/* Authentication here */

// Check for existing user
    export function getCurrentUser() {
      return (dispatch) => {
        let request = `${ROOT_URL}/users/current`;
        axios.get(request).then(response => {
          dispatch(loginSuccess(response.data));
        }, (response) => {
          console.log(response);
          // Error getting current user
          dispatch(loggedOut());
        });
      }
    }

export function loginRequest(props) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}/authenticate`, props).then(response => {
        if (response.status == 200) {
          dispatch(postSuccess('Logged in succesfully'));
          browserHistory.push('/');
          dispatch(loginSuccess(response.data));
          setTimeout(() => {
            dispatch(dismissAllFlash());
          }, 2500);
        }
      }, () => {
        dispatch(loginError());
        dispatch(postError('Failed to log in'));
        setTimeout(() => {
          dispatch(dismissAllFlash());
        }, 2500);
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
      let request = `${ROOT_URL}/authenticate`;
      axios.delete(request).then(response => {
        dispatch(loggedOut());
        browserHistory.push('/login');
        dispatch(postSuccess("Logout was successful. We hope to see you again soon!"));
        setTimeout(() => {
          dispatch(dismissAllFlash());
        }, 2500);
      }, () => {
        browserHistory.push('/');
        dispatch(postError("There was an error logging out"));
        setTimeout(() => {
          dispatch(dismissAllFlash());
        }, 2500);
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

import axios from 'axios';

import { browserHistory } from 'react-router';

export const FETCH_ALL_POLLS = 'FETCH_ALL_POLLS';
export const FETCH_SINGLE_POLL = 'FETCH_SINGLE_POLL';
export const UPDATE_VOTES = 'UPDATE_VOTES';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ROOT_URL = 'http://localhost:3000/api';

// Flash Actions
export const FLASH_ERROR = 'FLASH_ERROR';
export const FLASH_SUCCESS = 'FLASH_SUCCESS';
export const FLASH_INFO = 'FLASH_INFO';
export const DISMISS_FLASH = 'DISMISS_FLASH';
export const DISMISS_ALL_FLASH = 'DISMISS_ALL_FLASH';

export function postError (payload) {
  return {
    type: FLASH_ERROR,
    payload
  }
}

export function postSuccess (payload) {
  return {
    type: FLASH_SUCCESS,
    payload
  };
}

export function postInfo (payload) {
  return {
    type: FLASH_INFO,
    payload
  };
}

export function dismissFlash (payload) {
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

export function updateVotes(id, choice) {
  const request = axios.put(`${ROOT_URL}/polls/${id}`, {choice: choice});
  return {
    type:  UPDATE_VOTES,
    payload: request
  }
}

/* Authentication here */ 

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

import axios from 'axios';

export const FETCH_ALL_POLLS = 'FETCH_ALL_POLLS';
export const FETCH_SINGLE_POLL = 'FETCH_SINGLE_POLL';
export const UPDATE_VOTES = 'UPDATE_VOTES';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR'
const ROOT_URL = 'http://localhost:3000/api';

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

export function loginUser(props) {
  const request = axios.post(`${ROOT_URL}/authenticate`, props).then(data => {

    return dispatch()
    if (data.success) {
      return {
        type: LOGIN_SUCCESS,
        payload: data
      }
    }
    else {
      return {
        LOGIN_ERROR,
        payload: data.message
      }
    }
  });

  // return {
  //   type: LOGIN_REQUEST,
  //   payload: request
  // }
}
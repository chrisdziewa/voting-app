import {
  FETCH_ALL_POLLS,
  FETCH_SINGLE_POLL,
  FETCH_USER_POLLS
} from '../actions/index';


const INITIAL_STATE = { all: [], userPolls: [], singlePoll: {} };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ALL_POLLS:
      return { ...state, all: action.payload.data };
    case FETCH_SINGLE_POLL:
      return {...state, singlePoll: action.payload.data};
    case FETCH_USER_POLLS:
        return {...state, userPolls: action.payload.data};
    default:
      return state;
  }
};

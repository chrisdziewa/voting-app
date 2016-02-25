import {
  FETCH_ALL_POLLS,
  FETCH_SINGLE_POLL,
  UPDATE_VOTES,
  HIDE_ALL_RESULTS,
  CREATE_POLL
} from '../actions/index';


const INITIAL_STATE = { all: [], singlePoll: {} };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ALL_POLLS:
      return { ...state, all: action.payload.data };
    case FETCH_SINGLE_POLL:
      return {...state, singlePoll: action.payload.data};
    case HIDE_ALL_RESULTS:
      let hiddenResultPolls = state.all.map(poll => {
        poll.showResult = false;
        return poll;
      });
      return {...state, all: hiddenResultPolls};
    case UPDATE_VOTES:
      let nextAllPolls = state.all.map(poll => {
        if (poll._id === action.payload._id) {
          let newPoll = action.payload;
          newPoll.showResult = true;
          return newPoll;
        }
        return poll;
      });
      return {...state, all: nextAllPolls};
    case CREATE_POLL:
      console.log(action.payload.data);
      return {...state, all: [action.payload.data, ...state.all]};
    default:
      return state;
  }
};

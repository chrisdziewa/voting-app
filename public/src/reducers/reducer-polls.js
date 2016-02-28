import {
  FETCH_ALL_POLLS,
  FETCH_SINGLE_POLL,
  UPDATE_VOTES,
  HIDE_ALL_RESULTS,
  CREATE_POLL
} from '../actions/index';


const INITIAL_STATE = {
  all: [],
  singlePoll: {
    question: null,
    showResult: false,
    _id: null,
    choices: [],
    totalVotes: 0
  }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ALL_POLLS:
      return Object.assign({}, ...state, {all: action.payload.data}, {singlePoll: INITIAL_STATE.singlePoll});
    case FETCH_SINGLE_POLL:
      let fetchedPoll = Object.assign({}, {showResult: false}, action.payload);
      console.log('fetchedPoll: ', fetchedPoll);
      return Object.assign({}, {all: state.all}, {singlePoll: fetchedPoll});
    case HIDE_ALL_RESULTS:
      let hiddenSinglePoll = state.singlePoll;
      hiddenSinglePoll.showResult = false;
      let hiddenResultPolls = state.all.map(poll => {
        poll.showResult = false;
        return poll;
      });
      return Object.assign({}, ...state, {all: hiddenResultPolls}, {singlePoll: hiddenSinglePoll});
    case UPDATE_VOTES:
      let nextSinglePoll = state.singlePoll;
      if (state.singlePoll._id === action.payload._id) {
        nextSinglePoll = action.payload;
        nextSinglePoll.showResult = true;
      }
      let nextAllPolls = state.all.map(poll => {
        if (poll._id === action.payload._id) {
          let newPoll = action.payload;
          newPoll.showResult = true;
          return newPoll;
        }
        return poll;
      });
      return Object.assign({}, ...state, {all: nextAllPolls}, {singlePoll: nextSinglePoll});
    case CREATE_POLL:
      console.log(action.payload.data);
      return Object.assign({}, ...state, {all: [action.payload.data, ...state.all]});
    default:
      return state;
  }
};

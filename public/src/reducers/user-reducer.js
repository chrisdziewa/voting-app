import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGED_OUT,
  UPDATE_USER,
  GET_ALL_USERS
} from '../actions/index';


const INITIAL_STATE = {
  all: [],
  current: {
    loggedIn: false,
    id: null,
    username: null,
    email: null,
    bio: ''
  }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      let user = action.payload;
      return Object.assign({}, state, {
        current: {
          loggedIn: true,
          id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio
        }
      });
    case LOGIN_ERROR:
      if (state.current.loggedIn) {
        return state;
      } else {
        return Object.assign({}, state,
          {current: INITIAL_STATE.current}
        );
      }
    case LOGGED_OUT:
      return Object.assign({}, state, {current: INITIAL_STATE.current});
    case UPDATE_USER:
      let updated = action.payload;
      return Object.assign({}, state, {
        current: {
          id: updated._id,
          username: updated.username,
          email: updated.email,
          bio: updated.bio
        }
      });
    case GET_ALL_USERS:
      return Object.assign({}, state, {all: action.payload});
    default:
      return state;
  }
};

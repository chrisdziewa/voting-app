import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGED_OUT
} from '../actions/index';


const INITIAL_STATE = { loggedIn: false, id: null, username: null, email: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      let user = action.payload;
      return {
        loggedIn: true,
        id: user._id,
        username: user.username,
        email: user.email
      };
    case LOGIN_ERROR:
      if (state.loggedIn) {
        return state;
      } else {
        return INITIAL_STATE;
      }
    case LOGGED_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

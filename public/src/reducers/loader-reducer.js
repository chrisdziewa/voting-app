import {
  SHOW_LOADER,
  HIDE_LOADER
} from '../actions/index';


const INITIAL_STATE = { isLoading: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SHOW_LOADER:
      return {isLoading: true};
    case HIDE_LOADER:
      return {isLoading: false}
    default:
      return state;
  }
};

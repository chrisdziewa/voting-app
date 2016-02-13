import { 
  FLASH_ERROR,
  FLASH_INFO,
  FLASH_SUCCESS,
  DISMISS_FLASH
} from '../actions/index';


const INITIAL_STATE = { 
  success: '',
  errors: [],
  lastErrorId: 0,
  info: ''
};

export default function(state = INITIAL_STATE, action) {
  console.log('flash reducer called with payload', action);
  switch(action.type) {
    case FLASH_ERROR:
      console.log('flash error');
      let newID, errors;
      newID = state.lastErrorId + 1;
      errors = state.errors.concat({error: action.payload, id: newID});
      return Object.assign({}, state, {errors: errors}, {lastErrorId: newID});
    case FLASH_SUCCESS:
      console.log('flash success called');
      return Object.assign({}, state, {success: action.payload});
    case FLASH_INFO:
      return Object.assign({}, state, {info: action.payload});
    case DISMISS_FLASH:
      console.log('got a dismiss message');
      switch(action.payload.type) {
        case 'success': 
          return Object.assign({}, state, {success: ''});
        case 'info':
          return Object.assign({}, state, {info: ''});
        case 'error':
          console.log('got an error dismissal');
          let errors;
          errors = state.errors.filter(elem => elem.id !== action.payload.id);
          return Object.assign({}, state, {errors: errors});
      }
    default: 
      return state;
  }
};
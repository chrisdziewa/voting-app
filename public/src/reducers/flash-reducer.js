import { 
  FLASH_ERROR,
  FLASH_INFO,
  FLASH_SUCCESS,
  DISMISS_FLASH,
  DISMISS_ALL_FLASH
} from '../actions/index';


const INITIAL_STATE = { 
  success: '',
  errors: [],
  lastErrorId: 0,
  info: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FLASH_ERROR:
      let newID, errors;
      newID = state.lastErrorId + 1;
      errors = state.errors.concat({error: action.payload, id: newID});
      return Object.assign({}, state, {errors: errors}, {lastErrorId: newID});
    case FLASH_SUCCESS:
      return Object.assign({}, state, {success: action.payload});
    case FLASH_INFO:
      return Object.assign({}, state, {info: action.payload});
    case DISMISS_FLASH:
      switch(action.payload.type) {
        case 'success': 
          return Object.assign({}, state, {success: ''});
        case 'info':
          return Object.assign({}, state, {info: ''});
        case 'error':
          let errors;
          errors = state.errors.filter(elem => elem.id !== action.payload.id);
          return Object.assign({}, state, {errors: errors});
      }
    case DISMISS_ALL_FLASH:
      console.log('called DISMISS_ALL_FLASH');
      return INITIAL_STATE;  
    default: 
      return state;
  }
};
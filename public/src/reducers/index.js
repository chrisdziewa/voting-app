import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PollsReducer from './reducer-polls';

const rootReducer = combineReducers({
  polls: PollsReducer
});

export default rootReducer;

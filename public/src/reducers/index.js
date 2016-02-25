import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PollsReducer from './reducer-polls';
import UserReducer from './reducer-user';
import flash from './flash-reducer';
import loader from './loader-reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  polls: PollsReducer,
  form: formReducer,
  flash,
  loader
});

export default rootReducer;

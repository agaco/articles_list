import articles from './articles';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  articles,
  router: connectRouter(history),
});

export default rootReducer;

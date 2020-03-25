import { createStore, compose,  applyMiddleware } from 'redux';
import saga from 'store/sagas';
import { sagaMiddleware } from 'store/middleware';
import rootReducer from './reducers';
import {
  history,
  middlewareAll,
} from './middleware.js';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancer(applyMiddleware(...middlewareAll));

export default createStore(rootReducer(history), middleware);
sagaMiddleware.run(saga);



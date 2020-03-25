import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';


const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history);
const middlewareAll = [sagaMiddleware, reactRouterMiddleware];

export {
  history,
  middlewareAll,
  sagaMiddleware,
};

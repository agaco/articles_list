import invoices from './invoices';
import singleInvoice from './singleInvoice';


import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  invoices,
  singleInvoice,
  router: connectRouter(history),
});

export default rootReducer;

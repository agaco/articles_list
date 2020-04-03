import * as actionCase from '../actions/reduxActions';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionCase.worker.GET_ARTICLES_LIST:
    return {
      ...state,
      list: action.payload,
    };
  default:
    return state;
  }
};

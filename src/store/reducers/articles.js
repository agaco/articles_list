import * as actionCase from '../actions/reduxActions';

const initialState = {
  list: [],
  recommendations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionCase.worker.GET_ARTICLES_LIST:
    return {
      ...state,
      list: action.payload,
    };
  case actionCase.worker.SET_RECOMMENDATIONS:
    return {
      ...state,
      recommendations: action.payload,
    };
  default:
    return state;
  }
};

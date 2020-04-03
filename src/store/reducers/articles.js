import news from '../actions/reduxActions/news';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'GET_ARTICLES_LIST':
    return {
      ...state,
      list: action.payload,
    };
  default:
    return state;
  }
};

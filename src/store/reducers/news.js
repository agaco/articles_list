import news from '../actions/reduxActions/news';

const initialState = {
  sources: [],
  error: '',
  sources_categories: [],
  news: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'SET_LOADING':
    return {
      ...state,
      isLoading: true,
    };
  case news.ACTION_GET_SOURCES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      sources: action.payload,
    };
  case news.ACTION_GET_SOURCES_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'error msg',
    };
  default:
    return state;
  }
};

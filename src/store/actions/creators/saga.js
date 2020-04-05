import * as action from '../sagaActions';

const getArticlesSaga = (dispatch, payload) => {
  return dispatch({
    type: action.listener.GET_SOURCES_LIST,
    payload,
  });
};

export default {
  getArticlesSaga,
};

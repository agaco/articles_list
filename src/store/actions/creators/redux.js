import * as action from '../reduxActions';

const getArticlesList = (payload) => {
  return {
    type: action.worker.GET_ARTICLES_LIST,
    payload: payload,
  };
};

const setRecommendations = (payload) => {
  return {
    type: action.worker.SET_RECOMMENDATIONS,
    payload: payload,
  };
};


export default {
  getArticlesList,
  setRecommendations,
};

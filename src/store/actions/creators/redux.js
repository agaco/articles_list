import * as action from '../reduxActions';

const getArticlesList = (payload) => {
  return {
    type: action.default.GET_ARTICLES_LIST;
    payload: payload,
  };
};



export {
  getArticlesList,
};

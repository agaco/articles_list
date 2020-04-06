
import { put, select } from 'redux-saga/effects';
import * as selector from '../selectors';
import * as actionCreator from '../actions/creators';
import latinize from 'latinize';

const urlGen = (val, id) => {
  const res = val.replace(/[&\\#,+()$~%.'":*?<>{}]/gi, '').replace(/\s/gi, '-');
  return `${latinize(res.toLowerCase())}-id-${id}`;

};

function* setArticlesList({ payload }) {

  const withUrl = yield payload.map(item => {
    item.friendly_url = urlGen(item.title, item.original_id);
    return item;
  });

  yield put(actionCreator.redux.getArticlesList(withUrl));
}

function* getReccomendations({ payload }) {

  const articles = yield select(state => selector.getArticles(state));

  const res = yield articles.filter(item => {
    const matches = item.tags.length > 0 && item.tags.every(i => payload.includes(i));
    if (matches) return matches;
  });

  yield put(actionCreator.redux.setRecommendations(res));



}

export {
  setArticlesList,
  getReccomendations,
};


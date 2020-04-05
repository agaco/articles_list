
import { put, select } from 'redux-saga/effects';
// import * as selector from 'store/selectors';
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

  // const tags = yield payload.reduce((acc, item) => {
  //
  // }, []);

}


export {
  setArticlesList,
};


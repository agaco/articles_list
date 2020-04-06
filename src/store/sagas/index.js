import { takeEvery } from 'redux-saga/effects';
import * as articlesSaga from './articles';
import * as actions from '../actions/sagaActions';

export default function * () {
  yield takeEvery(
    actions.listener.GET_SOURCES_LIST,
    articlesSaga.setArticlesList);
  yield takeEvery(
    actions.listener.GET_RECOMMENDATIONS,
    articlesSaga.getReccomendations);
}

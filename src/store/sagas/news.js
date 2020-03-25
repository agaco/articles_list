import { put } from 'redux-saga/effects';
import * as api from '../../api';
import * as action from '../../store/actions/reduxActions';

function* fetchListOfVendors() {
  try {
    const response = yield api.news.getSources();
    const list = yield response && response.status === 200 && response.data;
    yield list && list.sources && list.sources.length > 1 && (
      put({
        type: action.news.ACTION_GET_SOURCES_SUCCESS,
        payload: list.sources,
      })
    );
  } catch (error) {
    yield put({ type: action.news.ACTION_GET_SOURCES_ERROR });
  }

}

export {
  fetchListOfVendors,
};

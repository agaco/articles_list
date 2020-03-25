import { put, call, cancel, select, take } from 'redux-saga/effects';
import * as api from 'api';
import * as selector from 'store/selectors';
import { getAccessToken } from 'utils/getToken';
import { queryParamsGen } from 'utils/queryParamsGen';
import { checkingIdTokenValidity } from './auth';
import {
  getAllPivotDataTabList,
  setActivePivotId,
  setStartPivotLoader,
  setStopPivotLoader,
  setStopPlanLoader,
  setStartPlanLoader,
} from 'store/actions/creators/redux';
import dateFormat from 'dateformat';
import { currentPlan } from '../actions/sagaActions';

function* getPivotsDataList() {

  let token = yield getAccessToken();
  const authStore = yield (state) => state.auth.info;
  const userInfo = yield select(authStore);
  const context = yield userInfo.email;

  let currentBuildingBlock = yield select((state) => selector.currentPlan.getChosenBuildingBlock(state));


  const queryParams = yield ({
    user_id: userInfo.id,
  });

  yield currentBuildingBlock !== '' && (queryParams.type = currentBuildingBlock);
  const queryDefault = yield queryParamsGen(queryParams);


  try {
    const response = yield api.pivots.getListOfPivots(token, context, queryDefault);

    yield response.status == 200 && put(getAllPivotDataTabList(response.data));

    while (currentBuildingBlock === '') {
      yield take(currentPlan.GET_CURRENT_PLAN_DATA_REQUEST);
      let currentBuildingBlock1 = yield select((state) => selector.currentPlan.getChosenBuildingBlock(state));
      yield  currentBuildingBlock !== '' && (currentBuildingBlock != currentBuildingBlock1) && call(getPivotsDataList);
    }


  } catch (error) {
    if (error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => getPivotsDataList());
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}


function* setSinglePivotTabData({payload}) {

  let token = yield getAccessToken();
  yield put(setStartPivotLoader());
  const userInfo = yield select((state) => state.auth.info);
  const context = yield userInfo.email;
  const userRoles = yield select((state) => selector.auth.getUserRoles(state));
  const pivotsData = yield select((state) => selector.pivots.getPivotsData(state));
  const now = new Date();
  const date = dateFormat(now, 'yyyy-mm-dd hh:MM:ss');
  const currentBuildingBlock = yield select((state) => selector.currentPlan.getChosenBuildingBlock(state));

  const {rows, columns, values} = pivotsData;
  const {id, update, name} = payload;


  const data = yield ({
    user_id: userInfo.id,
    user_role: userRoles.map(i => i.code).join(',').replace(/ /g, '_'),
    rows: rows && rows.length > 0 ? rows : [],
    columns: columns && columns.length > 0 ? columns : [],
    values: values && values.length > 0 ? values : [],
    filters: '',
    name: name,
    active: true,
    type: currentBuildingBlock,
    created_at: date.toString(),
  });

  yield id !== 'default' && put(setActivePivotId(parseFloat(id)));

  try {
    const response = yield update
      ? currentBuildingBlock && api.pivots.putPivotDataTab(token, context, data, id)
      : currentBuildingBlock && api.pivots.postNewPivotDataTab(token, context, data);

    yield ((response.status == 200) || (response.status == 201)) && call(getPivotsDataList);
    yield ((response.status == 200) || (response.status == 201)) && put(setStopPivotLoader());

  } catch (error) {
    if (error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => setSinglePivotTabData({payload}));
    } else {
      yield console.log(error.response);
      yield put(setStopPivotLoader());
      yield cancel();
    }
  }
}

function* deleteSinglePivotTabData({payload}) {

  let token = yield getAccessToken();
  yield put(setStartPlanLoader());
  const userInfo = yield select((state) => state.auth.info);
  const context = yield userInfo.email;
  const currentBuildingBlock = yield select((state) => selector.currentPlan.getChosenBuildingBlock(state));

  const {id} = payload;

  const queryParams = yield ({
    user_id: userInfo.id,
    type: currentBuildingBlock,
  });

  const queryDefault = yield queryParamsGen(queryParams);

  try {
    const response = yield currentBuildingBlock && api.pivots.deletePivotDataTab(token, context, queryDefault, id);
    yield put(setActivePivotId('default'));
    yield response.status == 204 && call(getPivotsDataList);
    yield put(setStopPlanLoader());
  } catch (error) {
    if (error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => deleteSinglePivotTabData({payload}));
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

export {
  getPivotsDataList,
  setSinglePivotTabData,
  deleteSinglePivotTabData,
};

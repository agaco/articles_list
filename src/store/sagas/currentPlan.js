
import { put, call, cancel, select} from 'redux-saga/effects';
import * as api from 'api';
import * as selector from 'store/selectors';
import { getAccessToken } from 'utils/getToken';
import { queryParamsGen } from 'utils/queryParamsGen';
import { getCurrentPlanData, setErrorMsgToCurrentPlan } from 'store/actions/creators/redux';
import { checkingIdTokenValidity } from './auth';
import {
  setCurrentPlanDate,
  setStopPlanLoader,
  setStartPlanLoader,
  startLoadingBuildingBlocks,
  updateValueToCurrentPlanData,
} from 'store/actions/creators/redux';
import { getTheListOfBuildingBlocks } from './buildingBlocks';

function* setPlanCriteria({payload}) {
  yield put(setCurrentPlanDate(payload));
}

function* getCurrentPlan() {

  let token = yield getAccessToken();
  const userData = yield (state) => state.auth.info.email;
  const context = yield select(userData);
  const user_id = yield select((state) => state.auth.info.id);
  const currentBuildingBlock = yield select((state) => state.currentPlan.buildingBlock);

  const planFilters = yield (state) => state.currentPlan.filters;
  const filters = yield select(planFilters);

  const forecastingUnitFilter = yield filters.forecasting_unit.join(',');
  const sku = yield filters.sku.join(',');

  const stringifedObject = yield JSON.stringify(filters);
  const filtersWithoutFu = yield JSON.parse(stringifedObject);
  yield delete filtersWithoutFu.forecasting_unit;
  yield delete filtersWithoutFu.sku;

  const queryDefault = yield queryParamsGen({...filtersWithoutFu, ...{type: currentBuildingBlock}, ...{user_id : user_id}});

  try {

    const response = yield api.plan.getListOfProducts(token, context, queryDefault, forecastingUnitFilter, sku);

    yield response.status === 200 && put(getCurrentPlanData(
      {
        data: response.data,
      }
    ));

    yield response.status === 200 && put(setStopPlanLoader());

  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => getCurrentPlan());
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

function* updateCurrentPlanValue({payload}) {
  yield call(setStartPlanLoader);
  yield call(startLoadingBuildingBlocks);

  let token = yield getAccessToken();
  const authStore = yield (state) => state.auth.info;
  const userInfo = yield select(authStore);
  const userRoles = yield select((state) => selector.auth.getUserRoles(state));

  const context = yield userInfo.email;

  const userDataBody = yield ({
    creator_user_id : userInfo.id,
    creator_user_role : userRoles.map(i => i.code).join(',').replace(/ /g, '_'),
  });


  const data = {...payload.payload, ...userDataBody};

  try {
    const response = yield api.plan.updatePlanValues(token, context, data);
    yield response.status == 201 && put(updateValueToCurrentPlanData(response.data));
    yield response.status == 201 && call(() => getTheListOfBuildingBlocks({isUpdate: true}));



  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => updateCurrentPlanValue({payload}));
    } else {
      yield console.log(error.response);
      yield put(setErrorMsgToCurrentPlan(error.response));
      yield cancel();
    }
  }
}

function* getVolumeTicketData({payload}) {

  let token = yield getAccessToken();
  const authStore = yield (state) => state.auth.info;
  const userInfo = yield select(authStore);
  const userRoles = yield select((state) => selector.auth.getUserRoles(state));

  const context = yield userInfo.email;

  const userDataBody = yield ({
    creator_user_id : userInfo.id,
    creator_user_role : userRoles.map(i => i.code).join(',').replace(/ /g, '_'),
  });

  const data = {...payload, ...userDataBody};
  const queryDefault = yield queryParamsGen(data);


  try {

    const response = yield api.plan.getVolumeStatus(token, context, queryDefault);
    yield console.log(response);
  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => getVolumeTicketData({payload}));
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

export {
  getCurrentPlan,
  setPlanCriteria,
  updateCurrentPlanValue,
  getVolumeTicketData,
};

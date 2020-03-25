
import { put, call, cancel, select } from 'redux-saga/effects';
import * as api from 'api';
import { getAccessToken } from 'utils/getToken';
import { checkingIdTokenValidity } from './auth';
import {
  setPlanUploadCountry,
  setPlanUploadDate,
  setBasicBuildingBlocks,
  getUploadedPlanData,
  postNewPlanError,
} from 'store/actions/creators/redux';
import {
  queryParamsGen,
} from 'utils/queryParamsGen';
import * as selector from '../selectors';


function* renderUploadList() {
  let token = yield getAccessToken();
  const context = yield select((state) => state.auth.info.email);
  const filters = yield select((state) => selector.uploadPlan.getPlanFilters(state));

  const forecastingUnitFilter = yield filters.forecasting_unit.join(',');
  const sku = yield filters.sku.join(',');
  const stringifedObject = yield JSON.stringify(filters);
  const filtersWithoutFu = yield JSON.parse(stringifedObject);
  delete filtersWithoutFu.forecasting_unit;
  delete filtersWithoutFu.sku;
  const query = yield queryParamsGen(filtersWithoutFu);


  try {
    const response = yield api.buildingBlocks.getListOfBuildingBlocks(token, context, query, forecastingUnitFilter, sku);
    yield response.status === 200 && response.data.length > 0 && put(setBasicBuildingBlocks(response.data));

  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(renderUploadList);
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

function* checkIfUserHasAlreadyUpladedPlan() {

  let token = yield getAccessToken();
  const context = yield select((state) => state.auth.info.email);
  const filters = yield select((state) => selector.uploadPlan.getPlanFilters(state));

  const forecastingUnitFilter = yield filters.forecasting_unit.join(',');
  const sku = yield filters.sku.join(',');
  const stringifedObject = yield JSON.stringify(filters);
  const filtersWithoutFu = yield JSON.parse(stringifedObject);
  delete filtersWithoutFu.forecasting_unit;
  delete filtersWithoutFu.sku;

  const queryDefault = yield queryParamsGen({...filtersWithoutFu, ...{type: 'plan'}});

  try {
    const response = yield api.uploadPlan.getAlreadyUploadedPlan(token, context, queryDefault, forecastingUnitFilter, sku);
    yield response.status === 200 && response.data.length > 0 && put(getUploadedPlanData(response.data));

  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(checkIfUserHasAlreadyUpladedPlan);
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

function* setPlanCriteria({payload}) {
  const { type, id, name } = payload;
  yield type === 'country' ? put(setPlanUploadCountry({id, name})) : put(setPlanUploadDate(payload));
}


function* validatePlan() {
  try {
    yield call(() => checkIfUserHasAlreadyUpladedPlan());

  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(validatePlan);
    } else {
      yield console.log(error.response);
      put(postNewPlanError(error.response));
      yield cancel();
    }
  }
}



export {
  validatePlan,
  renderUploadList,
  setPlanCriteria,
  checkIfUserHasAlreadyUpladedPlan,
};

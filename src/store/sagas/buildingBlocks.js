
import {put, call, select } from 'redux-saga/effects';
import * as api from 'api';
import { getAccessToken } from 'utils/getToken';
import { queryParamsGen } from 'utils/queryParamsGen';
import { getBuildingBlocksList, updateBuildingBlocksList, stopLoadingBuildingBlocks } from 'store/actions/creators/redux';
import { checkingIdTokenValidity } from './auth';
import * as selector from 'store/selectors';


function* getTheListOfBuildingBlocks({ isUpdate }) {
  let token = yield getAccessToken();
  const userData = yield (state) => state.auth.info.email;
  const context = yield select(userData);
  const bbFilters = yield (state) => selector.buildingBlocks.getBBfiltersList(state);
  const currentBuildingBlock = yield select((state) => selector.currentPlan.getChosenBuildingBlock(state));
  const filters = yield select(bbFilters);

  const forecastingUnitFilter = yield filters.forecasting_unit.join(',');
  const sku = yield filters.sku.join(',');
  const stringifedObject = yield JSON.stringify(filters);
  const filtersWithoutFu = yield JSON.parse(stringifedObject);

  if (isUpdate) {
    filtersWithoutFu.type = currentBuildingBlock;
  }
  delete filtersWithoutFu.forecasting_unit;
  delete filtersWithoutFu.sku;

  const query = yield queryParamsGen(filtersWithoutFu);

  try {
    const response = yield api.buildingBlocks.getListOfBuildingBlocks(token, context, query, forecastingUnitFilter, sku);

    if (response.status === 200) {

      isUpdate
        ? yield put(updateBuildingBlocksList(response.data))
        : yield put(getBuildingBlocksList(response.data));

      yield put(stopLoadingBuildingBlocks());
    }

  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(() => getTheListOfBuildingBlocks({ isUpdate }));
    } else {
      yield console.log(error.response);
    }
  }
}


export {
  getTheListOfBuildingBlocks,
};

import { takeEvery, takeLatest } from 'redux-saga/effects';
import * as newsSaga from './news';
// import * as authSaga from './auth';
// import * as usersSaga from './users';
// import * as bbSaga from './buildingBlocks';
// import * as planSaga from './currentPlan';
// import * as uploadPlanSaga from './uploadPlan';
// import * as pivotsSaga from './pivots';

import {
  news,
  // auth,
  // users,
  // buildingBlocks,
  // currentPlan,
  // uploadPlan,
  // pivots,
} from '../actions/sagaActions';

export default function * () {
  yield takeEvery(news.GET_SOURCES_REQUEST, newsSaga.fetchListOfVendors);
  // yield takeEvery(auth.GET_USER_DATA_REQUEST, authSaga.authorization);
  // yield takeEvery(auth.SET_USER_LOGGED_OUT, authSaga.setUserLoggedOut);
  // yield takeEvery(users.FILTER_USER_DATA_REQUEST, usersSaga.dataFiltering);
  // yield takeEvery(users.GET_USER_LIST_DATA_REQUEST, usersSaga.getUsersList);
  // yield takeEvery(users.POST_USER_DATA_REQUEST, usersSaga.sendUserData);
  // yield takeEvery(users.EDIT_USER_DATA_REQUEST, usersSaga.editUserData);
  // yield takeEvery(users.DELETE_USER_DATA_REQUEST, usersSaga.deleteUser);
  // yield takeLatest(buildingBlocks.GET_BB_LIST_DATA_REQUEST, bbSaga.getTheListOfBuildingBlocks);
  // yield takeLatest(buildingBlocks.GET_BB_LIST_DATA_FILTERS_REQUEST, bbSaga.getTheListOfBuildingBlocks);
  // yield takeLatest(currentPlan.GET_CURRENT_PLAN_DATA_REQUEST, planSaga.getCurrentPlan);
  // yield takeEvery(currentPlan.SET_PLAN_CRITERIA_REQUEST, planSaga.setPlanCriteria);
  // yield takeLatest(currentPlan.SET_NEW_VOLUME_TO_CURRENT_PLAN, planSaga.updateCurrentPlanValue);
  // yield takeEvery(currentPlan.GET_VOLUME_TICKET_DATA_FOR_CURRENT_PLAN, planSaga.getVolumeTicketData);
  // yield takeEvery(uploadPlan.SET_PLAN_CRITERIA_REQUEST, uploadPlanSaga.setPlanCriteria);
  // yield takeEvery(uploadPlan.RENDER_UPLOAD_TABLE, uploadPlanSaga.renderUploadList);
  // yield takeEvery(uploadPlan.VALIDATE_PLAN_DATA_REQUEST, uploadPlanSaga.validatePlan);
  // yield takeEvery(uploadPlan.CHECK_UPLOADED_PLANS, uploadPlanSaga.checkIfUserHasAlreadyUpladedPlan);
  // yield takeEvery(pivots.GET_PIVOTS_LIST_DATA, pivotsSaga.getPivotsDataList);
  // yield takeEvery(pivots.SET_SINGLE_PIVOT_DATA, pivotsSaga.setSinglePivotTabData);
  // yield takeEvery(pivots.DELETE_SINGLE_PIVOT_DATA, pivotsSaga.deleteSinglePivotTabData);
}

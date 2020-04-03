
// import { put, select } from 'redux-saga/effects';
// import * as selector from 'store/selectors';
// import {
//   setBuildingBlockFilter,
//   setCurrentPlanFilter,
//   setUploadPlanParams,
// } from 'store/actions/creators/redux';


function* setArticlesList() {
  yield console.log('dddddd');

  // const referenceData = yield select((state) => selector.config.getConfigReferenceData(state));
  // const personalInfo = yield select((state) => selector.auth.getPersonalData(state));
  // const ifUserHasBigCategoryId = yield personalInfo.categories.filter(i => i.level == 0);
  // const ifUserHasSmallCategoryId = yield personalInfo.categories.filter(i => i.level == 1);
  //
  // const allBigCategoriesOfUser = yield ifUserHasBigCategoryId.length > 0
  //   ? ifUserHasBigCategoryId.map(i => i.id)
  //   : [];
  //

  // yield put(setBuildingBlockFilter(data));
  // yield put(setCurrentPlanFilter(data));
  // yield put(setUploadPlanParams(uploadData));

}


export {
  setArticlesList,
};


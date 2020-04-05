
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
    item.url = urlGen(item.title, item.original_id);
    return item;
  });

  yield put(actionCreator.redux.getArticlesList(withUrl));

  // const tags = yield payload.reduce((acc, item) => {
  //
  // }, []);

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


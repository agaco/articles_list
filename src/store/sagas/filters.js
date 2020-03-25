
import { put, select } from 'redux-saga/effects';
import * as selector from 'store/selectors';
import {
  setBuildingBlockFilter,
  setCurrentPlanFilter,
  setUploadPlanParams,
} from 'store/actions/creators/redux';


function* setInitialFilters() {
  const referenceData = yield select((state) => selector.config.getConfigReferenceData(state));
  const personalInfo = yield select((state) => selector.auth.getPersonalData(state));
  const ifUserHasBigCategoryId = yield personalInfo.categories.filter(i => i.level == 0);
  const ifUserHasSmallCategoryId = yield personalInfo.categories.filter(i => i.level == 1);

  const allBigCategoriesOfUser = yield ifUserHasBigCategoryId.length > 0
    ? ifUserHasBigCategoryId.map(i => i.id)
    : [];

  const allSmallCategoriesOfUser = yield ifUserHasBigCategoryId.length > 0 && ifUserHasSmallCategoryId.length === 0
    ? (referenceData.categories
      .filter(i => i.level === 1)
      .filter(i => ifUserHasBigCategoryId.find(cat => i.parent_id == cat.id)).map(i => i.id))
    : ifUserHasSmallCategoryId.map(i => i.id);

  let allCpgs = [];

  yield allSmallCategoriesOfUser.length > 0 && allSmallCategoriesOfUser.map(item => {
    referenceData.categories.filter(cat => cat.parent_id == item).map(id => {
      !allCpgs.includes(id.id) && (allCpgs = [...allCpgs, id.id]);
    });
  });

  let customers = [];

  yield personalInfo.countries.forEach(country => {
    let countryId = country.id;
    let clusters = referenceData.ccc_relations.filter(i => i.country_id == countryId);

    const res = clusters.length > 0 && clusters.reduce((acc, item) => {
      !acc.includes(item.customer_id) && acc.push(item.customer_id);
      return acc;
    }, []);

    customers = [...customers, ...res];
  });

  const brands = yield allSmallCategoriesOfUser.reduce((acc, item) => {
    referenceData.brands_by_small_c[item] && referenceData.brands_by_small_c[item].forEach(val => {
      !acc.includes(val) && (acc = [...acc, val]);
    });

    return acc;
  }, []);


  let forecastingUnit = yield allCpgs.length > 0 && allCpgs.reduce((acc, item) => {
    referenceData.products_by_cpg[item] && referenceData.products_by_cpg[item].forEach(val => {
      !acc.includes(val.forecasting_unit) && (acc = [...acc, val.forecasting_unit]);
    });
    return acc;
  }, []);

  let sku_by_cpg = yield allCpgs.length > 0 && allCpgs.reduce((acc, item) => {
    referenceData.products_by_cpg[item] && referenceData.products_by_cpg[item].forEach(val => {
      !acc.includes(val.sku) && (acc = [...acc, val.sku]);
    });
    return acc;
  }, []);


  let innovationName = yield allCpgs.length > 0 && allCpgs.reduce((acc, item) => {
    referenceData.products_by_cpg[item] && referenceData.products_by_cpg[item].forEach(val => {
      val.innovation_project_name && !acc.includes(val.innovation_project_name) && (acc = [...acc, val.innovation_project_name]);
    });
    return acc;
  }, []);


  const data = {
    unit: 'SKU',
    country_id: personalInfo.countries.map(i => i.id),
    country_name: personalInfo.countries.map(i => i.name),
    cluster: personalInfo.clusters.map(i => i.id),
    role: personalInfo.roles.map(i => i.code),
    small_category: allSmallCategoriesOfUser,
    category: allBigCategoriesOfUser,
    volume_type: referenceData.volume_type[0].replace(' ', '_'),
    value_type: referenceData.value_type[0].replace(' ', '_'),
    currency: referenceData.currency_type.default.usd,
    cpgs: allCpgs, // remove when upload??
    customer: customers,// remove when upload??
    brands : brands,
    innovation_project_name: innovationName,
    forecasting_unit: forecastingUnit, // remove when upload??
    sku: sku_by_cpg,
  };

  // eslint-disable-next-line no-unused-vars
  const stringifiedData = yield JSON.stringify(data);

  const uploadData = yield JSON.parse(stringifiedData);
  yield delete uploadData.country_name;
  yield delete uploadData.country_id;

  yield put(setBuildingBlockFilter(data));
  yield put(setCurrentPlanFilter(data));
  yield put(setUploadPlanParams(uploadData));

}


export {
  setInitialFilters,
};



import { put, call, select, cancel } from 'redux-saga/effects';
import * as api from 'api';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
  removeRefreshToken,
} from 'utils/getToken';
import {
  renderAppSuccess,
  getUserRoleSucess,
  getReferenceConfigDataRequest,
  getReferenceConfigDataError,
  getConfigsData,
  addTransformedConfigsData,
} from 'store/actions/creators/redux';
import {
  setInitialFilters,
} from './filters';
import * as selector from 'store/selectors';
import { queryParamsGen } from 'utils/queryParamsGen';

const loginPageUrl = process.env.REACT_APP_LOGIN_PAGE_REDIRECT;

function* checkingIdTokenValidity() {
  let token = yield getRefreshToken();

  if (token) {
    const response = yield api.auth.postRefreshTokenToGetUserData(token);

    yield response.status === 200 && setAccessToken(response.data.id_token);
  } else {
    yield removeAccessToken();
    window.location.href = loginPageUrl;
  }
}

function* setUserLoggedOut() {
  let token = yield getAccessToken();
  yield token && removeRefreshToken();
  yield window.location.href = loginPageUrl;
}


function* authorization({payload}) {
  let token = yield getAccessToken();

  if (token && token.length > 0) {
    yield call(roleGranting);
    yield put(renderAppSuccess());

    return;
  }

  while (!token) {
    try {
      const response = yield api.auth.postAwsTokenToGetUserData(payload.code);
      yield response.status === 200 && (
        setAccessToken(response.data.id_token),
        setRefreshToken(response.data.refresh_token)
      );
      token = yield getAccessToken();
      yield call(roleGranting);
      yield put(renderAppSuccess());
    } catch(error) {
      console.log(error.response);
      if ( error.response.status === 401) {
        yield call(checkingIdTokenValidity);
      } else {
        yield console.log('error');
        window.location.href = loginPageUrl;
        yield cancel();
      }
    }
  }
}

function* roleGranting() {
  let token = yield getAccessToken();
  const stateRole = (state) => state.auth.roles;
  const roles = yield select(stateRole);

  if (!roles || roles.length !== 0) {
    try {
      const response = yield api.auth.getUserInfo(token);
      yield response.status === 200 && Object.keys(response.data).length > 0 && (
        localStorage.setItem('email', response.data.email),
        put(getUserRoleSucess(response.data))
      );


      yield call(getReferenceData);
      yield call(setInitialFilters);

    } catch(error) {
      if ( error.response.status === 401) {
        console.log(error.response);

        yield call(checkingIdTokenValidity);
        yield call(roleGranting);
      } else {
        yield console.log('ERR');
        yield cancel();
      }
    }
  }
}

function* getReferenceData() {

  let token = yield getAccessToken();
  const userCountries = yield select((state) => state.auth.info.countries);

  const country_id = yield userCountries.map(i => i.id);
  const query = yield queryParamsGen({ country_id });

  yield put(getReferenceConfigDataRequest());

  try {
    const response = yield api.users.getReferenceData(token, query);

    const { data, status } = response;
    yield status === 200 && (
      yield put(getConfigsData(data)),
      yield call(() => categoriesDistribution(data))
    );

  } catch (error) {
    if (error.response.status === 401) {
      put(getReferenceConfigDataError());
      yield call(checkingIdTokenValidity);
      yield call(getReferenceData);
    } else {
      yield console.log('ERR');
      yield cancel();
    }
  }
}



function* categoriesDistribution(payload) {
  const { categories, countries, clusters, products, roles } = payload;

  const categories_big = yield categories.filter(category => category.level === 0);

  const categories_small = yield categories_big.map(i => i.id).map(id => {
    return ({
      [id] : categories.filter(item => item.parent_id === id),
    });
  });

  const cpgs = yield () => {
    let smallCategoryIds = [];
    let result = {};

    categories_small.map(i => {
      const smallCategoryIdsList = Object.values(i);
      const [ smallCategory ] = smallCategoryIdsList;
      smallCategory.map(v => v.id).map(id => smallCategoryIds = [...smallCategoryIds, id]);
    });

    smallCategoryIds.map(item => {
      result[item] = categories.filter(i => i.parent_id == item);
    });

    return result;
  };

  const brands_by_small_c = yield categories
    .filter(category => category.level == 2)
    .reduce((acc, item) => {
      acc[item.parent_id]
        ? !acc[item.parent_id].includes(item.brand) && (acc[item.parent_id] = [...acc[item.parent_id], item.brand ])
        : acc[item.parent_id] = [item.brand];

      return acc;
    }, {});

  const cpg_by_brand = yield categories
    .filter(i => i.level == 2)
    .reduce((acc, item) => {
      acc[item.brand]
        ? acc[item.brand] = [...acc[item.brand], item]
        : acc[item.brand] = [item];
      return acc;
    }, {});

  const categories_small_by_big_c = yield categories_big
    .map(i => i.id)
    .reduce((acc, id) => {
      const item = {
        [id] : categories.filter(item => item.parent_id === id),
      };
      acc = {...acc, ...item};
      return acc;
    }, {});

  const forecasting_unit = yield products
    .reduce((acc, item) => {
      acc[item.cpg_id]
        ? acc[item.cpg_id] = [...acc[item.cpg_id], item]
        : acc[item.cpg_id] = [item];
      return acc;
    }, {});

  const referenceData = yield select((state) => selector.config.getConfigReferenceData(state));

  const customer_by_cluster = yield () => {
    return referenceData.ccc_relations && referenceData.ccc_relations
      .reduce((acc, item) => {
        acc[item.cluster_id]
          ? acc[item.cluster_id] = [...acc[item.cluster_id], item]
          : acc[item.cluster_id] = [item];
        return acc;
      }, {});
  };

  const cpg = cpgs();
  const customers_by_cluster = customer_by_cluster();

  const data = yield {
    roles,
    countries,
    clusters,
    categories,
    categories_big,
    categories_small,
    cpg,
    brands_by_small_c,
    categories_small_by_big_c,
    customers_by_cluster,
    'products_by_cpg' : forecasting_unit,
    'cpg_by_brand' : cpg_by_brand,
  };

  yield put(addTransformedConfigsData(data));
}


export {
  authorization,
  categoriesDistribution,
  setUserLoggedOut,
  checkingIdTokenValidity,
};

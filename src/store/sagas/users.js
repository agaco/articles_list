
import {
  call, cancel,
  put,
  select,
} from 'redux-saga/effects';
import * as api from 'api';
import {
  getAccessToken,
} from 'utils/getToken';
import {
  setFiltersToUsersListRequest,
  setFiltersToUsersList,
  updateListOfUsers,
  fillUserDataForm,
} from 'store/actions/creators/redux';
import { checkingIdTokenValidity } from './auth';

function* sendUserData({payload}) {
  try {
    let token = yield getAccessToken();
    const { data, id, type } = yield payload;

    const copy = yield JSON.stringify(data);
    const formattedData = yield JSON.parse(copy);

    yield Object.entries(data).map(item => {
      if (Array.isArray(item[1])) {
        item[0] === 'roles'
          ? formattedData[item[0]] = item[1].map(i => ({...{code : i}}))
          : formattedData[item[0]] = item[1].map(i => ({...{id : i}}));
      }
    });

    if (token && token.length > 0) {
      const response = yield type === 'edit'
        ? api.users.editUserData(token, formattedData, id)
        : api.users.createNewUser(token, formattedData);

      const updateList = yield response.status === 200 && api.users.getUsersList(token);
      yield updateList.status === 200 && updateList.data.length > 0 && put(updateListOfUsers(updateList.data));
    }
  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(sendUserData);
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

function* deleteUser({payload}) {

  let token = yield getAccessToken();
  if (token && token.length > 0) {
    const response = yield api.users.deleteUser(token, payload);
    const updateList = yield response.status === 200 && api.users.getUsersList(token);
    yield updateList.status === 200 && updateList.data.length > 0 && put(updateListOfUsers(updateList.data));
  }
}

function* editUserData({payload}) {
  const payloadData = JSON.stringify(payload.data);
  const copy = JSON.parse(payloadData);

  yield Object.entries(payload.data).map(item => {
    if (Array.isArray(item[1])) {
      if ((item[0] === 'roles')) {
        copy[item[0]] = item[1].map(i => i.code.toString());
      } else if (item[0] === 'categories') {
        copy.categories_big = item[1].filter(i => i.level === 0).map(i => i.id.toString());
        copy.categories_small = item[1].filter(i => i.level === 1).map(i => i.id.toString());
      } else {
        copy[item[0]] = item[1].map(i => i.id.toString());
      }
    }
  });

  yield Object.keys(payload.data).length > 0 && put(fillUserDataForm(copy));
}

function* getUsersList() {
  let token = yield getAccessToken();

  try {
    const response = yield api.users.getUsersList(token);
    yield response.status === 200 && response.data.length > 0 && put(updateListOfUsers(response.data));
  } catch(error) {
    if ( error.response.status === 401) {
      yield call(checkingIdTokenValidity);
      yield call(getUsersList);
    } else {
      yield console.log(error.response);
      yield cancel();
    }
  }
}

function* dataFiltering({payload}) {

  const { value } = yield payload;

  yield put(setFiltersToUsersListRequest());

  const stateUsers = (state) => state.users.listOfUsers;
  const users = yield select(stateUsers);
  const query = value.toLowerCase();

  const filtered = yield users.filter(item => {
    return (
      Object.entries(item).find(el => {
        if ( el && el[0] !== 'id' && el[0] !== 'role') {
          if ( Array.isArray(el[1])) {
            const row = el[1].map(i => i.name);
            return row.toString().toLowerCase().includes(query);
          } else {
            if (typeof el[1] == 'object' || el[1] === null) {
              return;
            } else {
              return (
                el[1].toString().toLowerCase().includes(query)
              );
            }
          }
        }
      })
    );
  });

  yield put(setFiltersToUsersList(filtered));
}

export {
  dataFiltering,
  getUsersList,
  sendUserData,
  editUserData,
  deleteUser,
};

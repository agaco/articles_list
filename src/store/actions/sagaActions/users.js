const prefix = 'USERS';
const type = 'LISTENER';

export default {
  FILTER_USER_DATA_REQUEST: `${type}:${prefix}_FILTER_USER_DATA_REQUEST`,
  GET_USER_LIST_DATA_REQUEST: `${type}:${prefix}_GET_USER_LIST_DATA_REQUEST`,
  POST_USER_DATA_REQUEST: `${type}:${prefix}_POST_USER_DATA_REQUEST`,
  EDIT_USER_DATA_REQUEST: `${type}:${prefix}_EDIT_USER_DATA_REQUEST`,
  DELETE_USER_DATA_REQUEST: `${type}:${prefix}_DELETE_USER_DATA_REQUEST`,
};

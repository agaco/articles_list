const prefix = 'AUTH';
const type = 'LISTENER';

export default {
  GET_USER_DATA_REQUEST: `${type}:${prefix}_GET_USER_DATA_REQUEST`,
  GET_USER_ROLE_REQUEST: `${type}:${prefix}_GET_USER_ROLE_REQUEST`,
  SET_USER_LOGGED_OUT: `${type}:${prefix}_SET_USER_LOGGED_OUT`,
};

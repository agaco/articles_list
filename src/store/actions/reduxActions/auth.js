const prefix = 'AUTH';
const type = 'WORKER';

export default  {
  RENDER_APP_SUCCESS: `${type}:${prefix}_RENDER_APP_SUCCESS`,
  RENDER_APP_ERROR: `${type}:${prefix}_RENDER_APP_ERROR`,
  GET_USER_ROLE_SUCCESS: `${type}:${prefix}_GET_USER_ROLE_SUCCESS`,
  GET_USER_ROLE_ERROR: `${type}:${prefix}_GET_USER_ROLE_ERROR`,
};


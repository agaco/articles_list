const prefix = 'NEWS';
const type = 'WORKER';

export default  {
  getSources: `${type}:${prefix}_GET_SOURCES_REQUEST`,
  ACTION_GET_SOURCES_SUCCESS: `${type}:${prefix}_GET_SOURCES_SUCCESS`,
  ACTION_GET_SOURCES_ERROR: `${type}:${prefix}_GET_SOURCES_ERROR`,
};


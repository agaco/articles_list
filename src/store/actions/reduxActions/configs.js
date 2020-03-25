const prefix = 'CONFIG_DATA';
const type = 'WORKER';

export default  {
  GET_REFERENCE_DATA_REQUEST: `${type}:${prefix}_GET_REFERENCE_DATA_REQUEST`,
  GET_REFERENCE_DATA_SUCCESS: `${type}:${prefix}_GET_REFERENCE_DATA_SUCCESS`,
  ADD_REFERENCE_DATA: `${type}:${prefix}_ADD_REFERENCE_DATA`,
  GET_REFERENCE_DATA_ERROR: `${type}:${prefix}_GET_REFERENCE_DATA_ERROR`,
  SET_MANAGED_PLAN_DATE: `${type}:${prefix}_SET_MANAGED_PLAN_DATE`,
};


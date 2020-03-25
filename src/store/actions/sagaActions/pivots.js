const prefix = 'PIVOT';
const type = 'LISTENER';

export default {
  GET_PIVOTS_LIST_DATA: `${type}:${prefix}_GET_PIVOTS_LIST_DATA`,
  SET_SINGLE_PIVOT_DATA: `${type}:${prefix}_SET_SINGLE_PIVOT_DATA`,
  DELETE_SINGLE_PIVOT_DATA: `${type}:${prefix}_DELETE_SINGLE_PIVOT_DATA`,
};

import * as action from '../sagaActions';

const authorizeUser = (code) => {
  return {
    type: action.auth.GET_USER_DATA_REQUEST,
    payload: {
      code,
    },
  };
};

const triggerFiltering = (value) => {
  return {
    type: action.users.FILTER_USER_DATA_REQUEST,
    payload: {
      value,
    },
  };
};

const setLoggingOut = () => {
  return {
    type: action.auth.SET_USER_LOGGED_OUT,
  };
};

const getUsersList = () => {
  return {
    type: action.users.GET_USER_LIST_DATA_REQUEST,
  };
};

const postUserData = (data) => {
  return {
    type: action.users.POST_USER_DATA_REQUEST,
    payload: data,
  };
};
const deleteUser = (data) => {
  return {
    type: action.users.DELETE_USER_DATA_REQUEST,
    payload: data,
  };
};

const loadInitialFormData = (data) => {
  return {
    type: action.users.EDIT_USER_DATA_REQUEST,
    payload: {
      data,
    },
  };
};

const getBuildingBlocksList = () => {
  return {
    type: action.buildingBlocks.GET_BB_LIST_DATA_REQUEST,
  };
};

const getBuildingBlocksListForFilters = () => {
  return {
    type: action.buildingBlocks.GET_BB_LIST_DATA_FILTERS_REQUEST,
  };
};

const getCurrentPlanList = (payload) => {
  return {
    type: action.currentPlan.GET_CURRENT_PLAN_DATA_REQUEST,
    payload,
  };
};

const setUploadPlanCriteria = (payload) => {
  return {
    type: action.uploadPlan.SET_PLAN_CRITERIA_REQUEST,
    payload,
  };
};

const validateUploadData = (payload) => {
  return {
    type: action.uploadPlan.VALIDATE_PLAN_DATA_REQUEST,
    payload,
  };
};


const renderUploadTable = (payload) => {
  return {
    type: action.uploadPlan.RENDER_UPLOAD_TABLE,
    payload,
  };
};

const checkAlreadyUploadedPLan = (payload) => {
  return {
    type: action.uploadPlan.CHECK_UPLOADED_PLANS,
    payload,
  };
};

const setCurrentPlanCriteria = ({payload}) => {
  return {
    type: action.currentPlan.SET_PLAN_CRITERIA_REQUEST,
    payload,
  };
};
const updateCurrentPlanVolume = (payload) => {
  return {
    type: action.currentPlan.SET_NEW_VOLUME_TO_CURRENT_PLAN,
    payload,
  };
};

const getTicketDataForVolume = (payload) => {
  return {
    type: action.currentPlan.GET_VOLUME_TICKET_DATA_FOR_CURRENT_PLAN,
    payload,
  };
};

const getPivotsListSaga = (payload) => {
  return {
    type: action.pivots.GET_PIVOTS_LIST_DATA,
    payload,
  };
};

const setSinglePivotData = (payload) => {
  return {
    type: action.pivots.SET_SINGLE_PIVOT_DATA,
    payload,
  };
};

const deleteSinglePivotData = (payload) => {
  return {
    type: action.pivots.DELETE_SINGLE_PIVOT_DATA,
    payload,
  };
};

export {
  deleteSinglePivotData,
  setSinglePivotData,
  getPivotsListSaga,
  authorizeUser,
  triggerFiltering,
  getUsersList,
  postUserData,
  loadInitialFormData,
  deleteUser,
  getBuildingBlocksList,
  getCurrentPlanList,
  setLoggingOut,
  setUploadPlanCriteria,
  renderUploadTable,
  validateUploadData,
  checkAlreadyUploadedPLan,
  setCurrentPlanCriteria,
  updateCurrentPlanVolume,
  getTicketDataForVolume,
  getBuildingBlocksListForFilters,
};

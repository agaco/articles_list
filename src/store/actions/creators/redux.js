import * as action from '../reduxActions';

const renderAppSuccess = () => {
  return {
    type: action.auth.RENDER_APP_SUCCESS,
  };
};

const getUserRoleSucess = (payload) => {
  return {
    type: action.auth.GET_USER_ROLE_SUCCESS,
    payload: payload,
  };
};

const setFiltersToUsersListRequest = () => {
  return {
    type: action.users.FILTER_USERS_LIST_REQUEST,
  };
};

const setFiltersToUsersList = (payload) => {
  return {
    type: action.users.FILTER_USERS_LIST_SUCCESS,
    payload: payload,
  };
};

const getReferenceConfigDataRequest = () => {
  return {
    type: action.users.GET_REFERENCE_DATA_REQUEST,
  };
};

const getReferenceConfigDataSuccess = (payload) => {
  return {
    type: action.users.GET_REFERENCE_DATA_SUCCESS,
    payload: payload,
  };
};

const getConfigsData = (payload) => {
  return {
    type: action.configs.GET_REFERENCE_DATA_SUCCESS,
    payload: payload,
  };
};
const addTransformedConfigsData = (payload) => {
  return {
    type: action.configs.ADD_REFERENCE_DATA,
    payload: payload,
  };
};

const getReferenceConfigDataError = (payload) => {
  return {
    type: action.users.GET_REFERENCE_DATA_ERROR,
    payload: payload,
  };
};

const updateListOfUsers = (payload) => {
  return {
    type: action.users.GET_USERS_LIST_SUCCESS,
    payload: payload,
  };
};

const fillUserDataForm = (payload) => {
  return {
    type: action.users.FILL_USER_DATA_FORM_REQUEST,
    payload: payload,
  };
};

const clearUserDataInitialValues = () => {
  return {
    type: action.users.CLEAR_USER_DATA_FORM_REQUEST,
  };
};

const getIdToken = (payload) => {
  return {
    type: action.config.GET_ID_TOKEN_REQUEST,
    payload: payload,
  };
};

const getRefrehToken = (payload) => {
  return {
    type: action.config.GET_REFRESH_TOKEN_REQUEST,
    payload: payload,
  };
};
const toggleIdTokenToREfreshOne = (payload) => {
  return {
    type: action.config.GET_REFRESH_TOKEN_REQUEST,
    payload: payload,
  };
};

const getBuildingBlocksList = (payload) => {
  return {
    type: action.buildingBlocks.GET_BUILDING_BLOCKS_LIST_DATA_REQUEST,
    payload: payload,
  };
};

const updateBuildingBlocksList = (payload) => {
  return {
    type: action.buildingBlocks.UPDATE_BUILDING_BLOCKS_LIST_DATA_REQUEST,
    payload: payload,
  };
};

const getCurrentPlanData = (payload) => {
  return {
    type: action.currentPlan.GET_CURRENT_PLAN_DATA_REQUEST,
    payload: payload,
  };
};

const updateValueToCurrentPlanData = (payload) => {
  return {
    type: action.currentPlan.SET_CURRENT_PLAN_NEW_VALUE_REQUEST,
    payload: payload,
  };
};

const setBuildingBlockToCurrentPlan = (payload) => {
  return {
    type: action.currentPlan.SET_CURRENT_BUILDING_BLOCK_REQUEST,
    payload: payload,
  };
};

const setPlanUploadCountry = (payload) => {
  return {
    type: action.uploadPlan.SET_PLAN_CRITERIA_REQUEST_COUNTRY,
    payload: payload,
  };
};

const setPlanUploadDate = (payload) => {
  return {
    type: action.uploadPlan.SET_PLAN_CRITERIA_REQUEST_DATE,
    payload: payload,
  };
};
const setBasicBuildingBlocks = (payload) => {
  return {
    type: action.uploadPlan.SET_BASIC_BUILDING_BLOCKS,
    payload: payload,
  };
};

const setClutsersForPlanUpload = (payload) => {
  return {
    type: action.uploadPlan.SET_COUNTRY_CLUSTERS_LIST,
    payload: payload,
  };
};

const setSmallCategoriesForPlanUpload = (payload) => {
  return {
    type: action.uploadPlan.SET_SMALL_CATEGORIES_LIST,
    payload: payload,
  };
};
const getUploadedPlanData = (payload) => {
  return {
    type: action.uploadPlan.GET_ALREADY_UPLOADED_PLAN,
    payload: payload,
  };
};

const postNewPlanRequest = () => {
  return {
    type: action.uploadPlan.UPLOAD_PLAN_REQUEST,
  };
};

const postNewPlanSuccess = () => {
  return {
    type: action.uploadPlan.UPLOAD_PLAN_SUCCESS,
  };
};

const postNewPlanError = (payload) => {
  return {
    type: action.uploadPlan.UPLOAD_PLAN_ERROR,
    payload: payload,
  };
};

const setCurrentPlanDate = (payload) => {
  return {
    type: action.currentPlan.SET_PLAN_CRITERIA_REQUEST_DATE,
    payload: payload,
  };
};

const setBuildingBlockFilter = (payload) => {
  return {
    type: action.buildingBlocks.SET_BUILDING_BLOCKS_FILTER_REQUEST,
    payload: payload,
  };
};
const setCurrentPlanFilter = (payload) => {
  return {
    type: action.currentPlan.SET_CURRENT_PLAN_FILTER_REQUEST,
    payload: payload,
  };
};

const setUploadPlanParams = (payload) => {
  return {
    type: action.uploadPlan.SET_UPLOAD_PLAN_QUERY_REQUEST,
    payload: payload,
  };
};

const setSinglePivot = (payload) => {
  return {
    type: action.pivots.SET_SINGLE_PIVOT_TO_CURRENT_PLAN,
    payload: payload,
  };
};
const setAllPivots = (payload) => {
  return {
    type: action.pivots.SET_ALL_PIVOTS_TO_CURRENT_PLAN,
    payload: payload,
  };
};

const removeSinglePivot = (payload) => {
  return {
    type: action.pivots.REMOVE_SINGLE_PIVOT_FROM_CURRENT_PLAN,
    payload: payload,
  };
};

const setNewOrderToPivots = (payload) => {
  return {
    type: action.pivots.SET_NEW_PIVOTS_ORDER,
    payload: payload,
  };
};

const getAllPivotDataTabList = (payload) => {
  return {
    type: action.pivots.GET_ALL_PIVOT_DATA_TAB_LIST,
    payload: payload,
  };
};

const setManagedPlanDate = (payload) => {
  return {
    type: action.configs.SET_MANAGED_PLAN_DATE,
    payload: payload,
  };
};

const stopLoadingBuildingBlocks = () => {
  return {
    type: action.buildingBlocks.SET_STOP_LOADING,
  };
};

const startLoadingBuildingBlocks = () => {
  return {
    type: action.buildingBlocks.SET_START_LOADING,
  };
};

const setErrorMsgToCurrentPlan = (payload) => {
  return {
    type: action.currentPlan.SET_CURRENT_PLAN_ERROR_MESSAGE,
    payload: payload,
  };
};

const setActivePivotId = (payload) => {
  return {
    type: action.pivots.SET_ACTIVE_PIVOT_ID,
    payload: payload,
  };
};

const setStopPlanLoader = () => {
  return {
    type: action.currentPlan.SET_CURRENT_PLAN_STOP_LOADING,
  };
};

const setStartPlanLoader = () => {
  return {
    type: action.currentPlan.SET_CURRENT_PLAN_START_LOADING,
  };
};

const setStartPivotLoader = () => {
  return {
    type: action.pivots.SET_START_LOADING,
  };
};

const setStopPivotLoader = () => {
  return {
    type: action.pivots.SET_STOP_LOADING,
  };
};

export {
  setStartPlanLoader,
  setStopPlanLoader,
  setAllPivots,
  setActivePivotId,
  getAllPivotDataTabList,
  setErrorMsgToCurrentPlan,
  setBuildingBlockToCurrentPlan,
  stopLoadingBuildingBlocks,
  startLoadingBuildingBlocks,
  setManagedPlanDate,
  addTransformedConfigsData,
  setSinglePivot,
  removeSinglePivot,
  setNewOrderToPivots,
  setBuildingBlockFilter,
  setCurrentPlanFilter,
  setUploadPlanParams,
  postNewPlanRequest,
  postNewPlanSuccess,
  postNewPlanError,
  renderAppSuccess,
  setClutsersForPlanUpload,
  setSmallCategoriesForPlanUpload,
  getUserRoleSucess,
  getConfigsData,
  setFiltersToUsersListRequest,
  setFiltersToUsersList,
  getReferenceConfigDataRequest,
  getReferenceConfigDataSuccess,
  getReferenceConfigDataError,
  updateListOfUsers,
  fillUserDataForm,
  clearUserDataInitialValues,
  getRefrehToken,
  getIdToken,
  toggleIdTokenToREfreshOne,
  getBuildingBlocksList,
  getCurrentPlanData,
  setPlanUploadCountry,
  setPlanUploadDate,
  setBasicBuildingBlocks,
  getUploadedPlanData,
  setCurrentPlanDate,
  updateValueToCurrentPlanData,
  updateBuildingBlocksList,
  setStartPivotLoader,
  setStopPivotLoader,
};

import auth from '../actions/reduxActions/auth';

const initialState = {
  list: [],
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
  case auth.RENDER_APP_SUCCESS:
    return {
      ...state,
      isSignedIn: true,
    };
  case auth.RENDER_APP_ERROR:
    return {
      ...state,
      isSignedIn: false,
    };
  case auth.GET_USER_ROLE_SUCCESS:
    return {
      ...state,
      roles: action.payload.roles,
      info: action.payload,
      error: '',
    };
  case auth.GET_USER_ROLE_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

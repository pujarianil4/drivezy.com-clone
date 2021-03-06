import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOGIN_REQUEST, SAVE_NAME, USER_LOGOUT } from "./AuthActionTypes"


const initState = {
  authLoading: false,
  authFailure: false,
  user: JSON.parse(localStorage.getItem("drivezyuserKey")) || null,
  token: JSON.parse(localStorage.getItem("drivezytoken")) || null,
  loginRes:null,
  verified:false,
  name:null
};

export const authReducer = (state = initState, action) => {

  switch (action.type) {
    case AUTH_REQUEST: {
      // console.log("reducer auth", action)
      return {
        ...state,
        authLoading: true,
      };
    }
    case AUTH_SUCCESS: {
      localStorage.setItem("drivezyuserKey",JSON.stringify(action.payload.user))
      localStorage.setItem("drivezytoken",JSON.stringify(action.payload.token))
      return {
        ...state,
        authLoading: false,
        user: action.payload.user,
        token:action.payload.token,
        verified:true
      };
    }
    case USER_LOGOUT: {
      localStorage.removeItem("drivezyuserKey")
      localStorage.removeItem("drivezytoken")
      return {
        ...state,
        user:null,
        token:null,
        authLoading: false,
        authFailure: true,
      };
     
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        authLoading: false,
        authFailure: true,
      };
    }
    case SAVE_NAME: {
      return {
        ...state,
       name:action.payload
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        authLoading: false,
        loginRes:action.payload
      };
    }

    default:
      return state;
  }
};

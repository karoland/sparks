import {
  HIDE_ERROR,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  LOGOUT_USER,
  USER_TOKEN_SET,
  USER_DATA,
  AUTH_USER,
  CLEAR_POSTS,
  CLEAR_ALL_STATES,
  SUCCESS_VIEWED
} from "constants/ActionTypes";

const INIT_STATE = {
  token: JSON.parse(localStorage.getItem('token')),
  initURL: '',
  authUser: JSON.parse(localStorage.getItem('authUser')),
  resetToken: '',
  success: false,
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case AUTH_USER: {
            return {...state, authUser: action.payload }
    }
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        resetToken: action.payload
      }
    }

    case SUCCESS_VIEWED: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        authUser: action.payload
      }
    }
        
    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }


    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        //initURL: '/signin',
        loading: false,
        token: null,
      }
    }

    case LOGOUT_USER: {
      return {
        ...state 
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loading: false
      }
    }
    case HIDE_ERROR: {
      return {
        ...state,
        error: '',
        loading: false
      }
    }

    case SIGNIN_FACEBOOK_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case SIGNIN_TWITTER_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loading: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loading: false
      }
    }
    case CLEAR_POSTS: {
      return {
        ...state,
        posts: ''
      }
    }
    case CLEAR_ALL_STATES: {
      return {
        loading: false,
        alertMessage: '',
        showMessage: false,
        initURL: '',
        authUser: null,
        token:null,
      }
    }
    default:
      return state;
  }
}

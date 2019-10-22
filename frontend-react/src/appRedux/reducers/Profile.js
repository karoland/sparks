import {PROFILE_DATA, POST_DATA, GET_POSTS, AVATAR_SUCCESS, UPLOADING_START, UPLOADING_ERROR, GET_FRIENDS_POSTS} from '../../constants/ActionTypes'

const INIT_STATE = {
    uploaded:false,
    error:"",
    loading:false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROFILE_DATA: {
      return {
        ...state,
        profileData: action.payload,
      }
    }
    case POST_DATA: {
       return {
         ...state,
         posts: action.payload
       }
    }
    case GET_FRIENDS_POSTS: {
       return {
         ...state,
         friendsPosts: action.payload
       }
    }
    case AVATAR_SUCCESS: {
       return {
         ...state,
         uploaded:true,
         loading: false,
       }
    }
    case UPLOADING_START: {
       return {
         ...state,
         uploaded: false,
         loading:true,
         error: ""
       }
    }
    case UPLOADING_ERROR: {
       return {
         ...state,
         uploaded: false,
         loading: false,
         error: action.payload
       }
    }
    case GET_POSTS: {
      return {
        ...state,
        posts: action.payload
      }
    }
    default:
      return state;
  }
}

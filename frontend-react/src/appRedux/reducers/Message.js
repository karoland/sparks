import {MESSAGE_DATA, GET_MESSAGE, GET_All_MESSAGES, SUCCESS_VIEWED, SUCCESS_SENT, GET_POST, READ_MESSAGE} from '../../constants/ActionTypes'

const INIT_STATE = {
//  profleData: null,
    success: false,

};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
   
    case MESSAGE_DATA: {
       return {
         ...state,
         newMessage: action.payload,
         loading:false,
       }
     }
    case GET_MESSAGE: {
      return {
        ...state,
        getMessage: action.payload,
        loading: false,
      }
    }
    case READ_MESSAGE: {
      return {
        ...state,
        getMessage: action.payload,
        loading: false,
      }
    }
    case GET_POST: {
      return {
        ...state,
        getPost: action.payload,
        loading: false,
      }
    }
    case GET_All_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
        loading: false,
      }
    }
    // case All_MESSAGES_PLUS_ONE: {
    //   return {
    //     ...state,
    //     messages: action.payload,
    //     loading: false,
    //   }
    // }

    case SUCCESS_VIEWED: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case SUCCESS_SENT: {
      return {
        ...state,
        loading: false,
        success: true,
      }
    }
    // return Object.assign({}, state, {
    //     ...state,
    //     posts: [
    //       ...state.posts,
    //       {
    //         newPost: action.payload
    //       }
    //     ]
    //   })

    
    // case GET_POSTS: {
    //   return {
    //     ...state,
    //     posts: action.payload
    //   }
    // }
    default:
      return state;
  }
}

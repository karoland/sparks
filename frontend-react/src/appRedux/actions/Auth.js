import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  INIT_URL,
  AUTH_USER,
  USER_TOKEN_SET,
  HIDE_ERROR,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  GET_POSTS,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  CLEAR_POSTS,
  CLEAR_ALL_STATES,
  SUCCESS_VIEWED
} from "constants/ActionTypes";
import axios from 'util/Api'


export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({email, password, name}) => {
  console.log(email, password, name);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('users/signup', {
        email: email,
        password: password,
        name: name
      }
    ).then(({data}) => {
      console.log("data:", data);

      if (data.user.resetToken) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SIGNUP_USER_SUCCESS, payload: data.user.resetToken});
      } else {
        //console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(error => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};



export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const successViewed = () => {
  return {
    type: SUCCESS_VIEWED,
  };
};

export const userSignIn = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('users/signin', {
        email: email,
        password: password,
      }
    ).then(({data}) => {
      if (data.userdata) {
        localStorage.setItem("token", JSON.stringify(data.userdata.token));
        localStorage.setItem("authUser", JSON.stringify(data.userdata));

//        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.userdata.token});
        dispatch({type: SIGNIN_USER_SUCCESS, payload: data.userdata});

      } else {
        console.log("userSignInError: ", data.error);
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

// Automatic signin after successful activation
export const userAutoSignIn = ({email}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('users/auto_signin', { email: email }
    ).then(({data}) => {
      console.log("Data autoSignin", data)
      console.log("Data autoSignin EMAIL", email)

      if (data.userdata) {
        localStorage.setItem("token", JSON.stringify(data.userdata.token));
        localStorage.setItem("authUser", JSON.stringify(data.userdata));

//        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.userdata.token});
        dispatch({type: SIGNIN_USER_SUCCESS, payload: data.userdata});

      } else {
        console.log("userSignInError: ", data.error);
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};

export function userAuth(){
    const token = JSON.parse(localStorage.getItem("token"));
    const request = axios.get('users/auth', { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export const getUser = () => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")); 
    console.log("Token auth", token)
    axios.get('users/auth', { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
      console.log("userAuth: ", data);
      if (data.user) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SIGNIN_USER_SUCCESS, payload: data.user});
      } 
    //   else {
    //     dispatch({type: FETCH_ERROR, payload: data.error});
    //   }
    // }
    // )
    // .catch(function (error) {
    //   dispatch({type: FETCH_ERROR, payload: error.message});
    //   console.log("Error****:", error.message);
     });
  }
};


export function userSignOut(){
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    dispatch({type: SIGNOUT_USER_SUCCESS});
 //   window.location.reload();


 //   const request = axios.get('users/signout')
 //   .then(response => response.data);
//    localStorage.removeItem("token");

//    return {
//        type: SIGNOUT_USER_SUCCESS,
//        payload: request
//    }
  }
}


export const getPosts = () => {
  return (dispatch) => {
    //dispatch({type: FETCH_START});
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get('posts', { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
      console.log("posts: ", data);
   
      //  dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_POSTS, payload: data});
      
    })
  }
};


export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};

export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};

export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  };
};

export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};

export function clearPosts(){
    return {
        type: CLEAR_POSTS,
    };
};

export function clearAllStates(){
    return {
        type: CLEAR_ALL_STATES,
    };
};
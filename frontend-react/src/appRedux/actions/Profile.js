import {
  FETCH_START,
//  FETCH_ERROR,
  FETCH_SUCCESS,
  PROFILE_DATA,
  GET_POSTS,
  POST_DATA,
  AVATAR_SUCCESS,
  UPLOADING_START,
  UPLOADING_ERROR,
  GET_FRIENDS_POSTS,
  SIGNIN_USER_SUCCESS,
} from "constants/ActionTypes";
import axios from 'util/Api'


export const readProfile = (userId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch({type: FETCH_START});
    axios.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
      //console.log("profile: ", data);   
        dispatch({type: PROFILE_DATA, payload: data});
        dispatch({type: FETCH_SUCCESS});
    })
  }
};


export const updateProfile = (userId, user, authUser) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    console.log("User to update ", user)
    const token = JSON.parse(localStorage.getItem("token"));
    axios.put(`/user/${userId}`, user, { headers: {"Authorization" : `Bearer ${token}`},  }
    ).then(({data}) => {
      console.log("profile DATA DATA: ", data, "Data name", data.name);


        if(authUser) {
          let newUser = authUser;
          newUser.name=data.name;
          dispatch({type: SIGNIN_USER_SUCCESS, payload: authUser});

        }

        dispatch({type: PROFILE_DATA, payload: data});
        dispatch({type: FETCH_SUCCESS});
    })
  }
};


export const updateAvatar = (userId, userData, authUser) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    console.log("User to update avatar", userId)
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch({type: UPLOADING_START});    

    axios.put(`/user/avatar/${userId}`, userData, { headers: {"content-type": "multipart/form-data", "Authorization" : `Bearer ${token}`}}
    ).then(({data}) => {
      console.log("profile: ", data);
        dispatch({type: PROFILE_DATA, payload: data});
        dispatch({type: AVATAR_SUCCESS});

        let authUser = localStorage.getItem("authUser");
        authUser = authUser ? JSON.parse(authUser) : {};
        authUser["avatar"] = data.avatar.url;
        localStorage.setItem("authUser", JSON.stringify(authUser));

        let newUser = authUser;
        newUser.avatar= data.avatar ? data.avatar.url : null ;
        dispatch({type: SIGNIN_USER_SUCCESS, payload: newUser});


        dispatch({type: FETCH_SUCCESS});
    }).catch(function (error) {
      dispatch({type: UPLOADING_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const getPosts = (userId) => {
  return (dispatch) => {
    //dispatch({type: FETCH_START});
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get(`/posts/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
     // console.log("posts: ", data);
      //  dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_POSTS, payload: data});      
    })
  }
};

export const getFriendsPosts = (userId) => {
  return (dispatch) => {
    //dispatch({type: FETCH_START});
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get(`/friendsPosts/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
     // console.log("posts: ", data);
      //  dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_FRIENDS_POSTS, payload: data});      
    })
  }
};

export const createPost = (post, existingPosts, listType) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    console.log("Creating post ", post)
    const token = JSON.parse(localStorage.getItem("token"));
    axios.post("/post", post, { headers: {"Authorization" : `Bearer ${token}`},  }
    ).then(({data}) => {
       let posts = [
            data,
            ...existingPosts,
       ];
      console.log("CreatingPOST: ", posts);

      if(listType==="myPosts") 
      {
        dispatch({type: POST_DATA, payload: posts});
      }
      if(listType==="friendsPosts") 
      {
        dispatch({type: GET_FRIENDS_POSTS, payload: posts});
      }
//        dispatch({type: POST_DATA, payload: data});

        dispatch({type: FETCH_SUCCESS});        
    })
  }
};

export const follow = (userId, followId) => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.post("user/follow", JSON.stringify({ userId, followId }), { headers: {"Authorization" : `Bearer ${token}`},  }
    ).then(({data}) => {       
      console.log("CreatingFollow: ", data);
      dispatch({type: PROFILE_DATA, payload: data});
      dispatch({type: FETCH_SUCCESS});

    }).catch(error => console.log(error))
  }
};

export const unfollow = (userId, followId) => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.post("user/unfollow", JSON.stringify({ userId, followId }), { headers: {"Authorization" : `Bearer ${token}`},  }
    ).then(({data}) => {       
      console.log("CreatingFollow: ", data);
      dispatch({type: PROFILE_DATA, payload: data});
      dispatch({type: FETCH_SUCCESS});

    }).catch(error => console.log(error))
  }
};
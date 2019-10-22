import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  GET_MESSAGE,
  GET_All_MESSAGES,
  SUCCESS_VIEWED,
  SUCCESS_SENT,
  HIDE_ERROR,
  GET_POST,
  READ_MESSAGE
} from "constants/ActionTypes";
import axios from 'util/Api'



// export const getPosts = (userId) => {
//   return (dispatch) => {
//     //dispatch({type: FETCH_START});
//     const token = JSON.parse(localStorage.getItem("token"));
//     axios.get(`/posts/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
//     ).then(({data}) => {
//      // console.log("posts: ", data);
//       //  dispatch({type: FETCH_SUCCESS});
//         dispatch({type: GET_POSTS, payload: data});

//     })
//   }
// };

export const createMessage = (message, existingMessages) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    console.log("Creating message ", message)
    const token = JSON.parse(localStorage.getItem("token"));
    axios.post("/newMessage", message, { headers: {"Authorization" : `Bearer ${token}`},  }
    ).then(({data}) => {
      
//      let messages = data.result;
      if(existingMessages !== null) {
      console.log("MESSAGES NEW ALL: ", existingMessages);

       let messages = [
            data.result,
            ...existingMessages,
       ];
      console.log("MESSAGES NEW ALL: ", messages);

      dispatch({type: GET_All_MESSAGES, payload: messages});
      dispatch({type: SUCCESS_SENT});
      dispatch({type: FETCH_SUCCESS});

     }
     if(existingMessages == null){
        console.log("One message")
        dispatch({type: GET_MESSAGE, payload: data.result});
        dispatch({type: SUCCESS_SENT});
        dispatch({type: FETCH_SUCCESS});

     }      
 
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const successViewed = () => {
  return (dispatch) => {
    dispatch({type: SUCCESS_VIEWED});
    dispatch({type: HIDE_ERROR});
  };
};

export const getMessage = (messageid) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
      axios.post("/message", {messageid}

//    axios.post("/message/", { params: { messageid: messageid}}
    ).then(({data}) => {
     // console.log("posts: ", data);
      //  dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_MESSAGE, payload: data});
        dispatch({type: FETCH_SUCCESS})
      
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const messageRead = (messageid, existingMessages) => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
//    console.log("Creating message ", message)
    const token = JSON.parse(localStorage.getItem("token"));

    axios.post("/messageRead", {messageid}, { headers: {"Authorization" : `Bearer ${token}`},  }
    ).then(({data}) => {
//      let messages = data.result;

//      let removedMessage= existingMessages.filter(function(mess) { 
//        return mess._id !== messageid
//      });

//      let newMessages = [
//        data,
//        ...removedMessage,
//      ];
      let newMessage = data.find(x => x._id === messageid);

      console.log("MESSAGES ALL", data, "MESSAGES NEW ALL: ", newMessage);

      dispatch({type: GET_All_MESSAGES, payload: data});
      dispatch({type: READ_MESSAGE, payload: newMessage});

      dispatch({type: FETCH_SUCCESS});

    
    }).catch(function (error) {
      //dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};


export const getPost = (postid) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
      axios.post("/getpost", {postid}

    ).then(({data}) => {
     // console.log("posts: ", data);
      //  dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_POST, payload: data});
        dispatch({type: FETCH_SUCCESS})
      
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const getAllMessages = (userId) => {
  return (dispatch) => {
    //dispatch({type: FETCH_START});
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get(`/getAllMessages/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
     // console.log("posts: ", data);
      //  dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_All_MESSAGES, payload: data});
      
    })
  }
};


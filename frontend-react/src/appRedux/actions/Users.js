import {
  FETCH_START,
  FETCH_SUCCESS,
  ALL_USERS
} from "constants/ActionTypes";
import axios from 'util/Api'



export const allUsers = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    const token = JSON.parse(localStorage.getItem("token"));
    axios.get("/users", { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(({data}) => {
      //console.log("profile: ", data);
   
        dispatch({type: ALL_USERS, payload: data});
        dispatch({type: FETCH_SUCCESS});
      
    })
  }
};





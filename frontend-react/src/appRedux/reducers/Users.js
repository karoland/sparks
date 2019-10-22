import {ALL_USERS, } from '../../constants/ActionTypes'

const INIT_STATE = {
//  profleData: null,


};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload
      }
    }

    default:
      return state;
  }
}

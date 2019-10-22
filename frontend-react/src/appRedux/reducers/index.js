import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Profile from "./Profile";
import Users from "./Users";
import Message from "./Message";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  profile: Profile,
  users: Users,
  message: Message

});

export default reducers;

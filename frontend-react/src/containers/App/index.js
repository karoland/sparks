import React, {Component} from "react";
import {connect} from "react-redux";
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";
//import axios from 'util/Api'

//import pl_PL from 'antd/es/locale-provider/pl_PL';
import moment from 'moment';
//import 'moment/locale/pl';

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ActivateUser from "routes/userAuth/ActivateUser"
//import Profile from "routes/Profile";
import NewMessage from "routes/Mail/NewMessage";
import NewPost from "routes/Mail/NewPost";

import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";


import { getUser} from "../../appRedux/actions/Auth";
import { isAuthenticated } from "../auth";

moment.locale('pl');


const RestrictedRoute = ({component: Component, ...rest}) =>
  <Route
        {...rest}
        render={props =>
            isAuthenticated()  ? 
                <Component {...props} />
             :  <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
        }
    />;
  


class App extends Component {

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
//      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };


  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get('theme'));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get('nav-style'));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get('layout-type'));
    }
    
  }




//componentDidMount() {
//  console.log("DID MOUNT");
//  this.props.getUser()
//}
//     getDerivedStateFromProps (nextProps) {
// console.log("WillRecieveProps Before", this.props.authUser);
//     if (!nextProps.authUser) {
//       this.props.getUser()
//     }
//     console.log("WillRecieveProps After", this.props.authUser);

//   }


  // authenticate = async () => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   await axios.get('users/auth', { headers: {"Authorization" : `Bearer ${token}`} })
  //   .then(response => {
  //     if(response.data.user) {this.props.setState({'authUser': response.data.user})}
  //     console.log("Response in main", response.data) })
  // }


  render() {

    const {match, location, layoutType, navStyle, locale, authUser} = this.props;
//    console.log("INSIDE APP Is isAuthenticated", this.props.authUser)

    if (location.pathname === '/signin') {
      if (isAuthenticated() ) {
        return ( <Redirect to={'/'}/> );
      } 
    } 

//    console.log("Is authenticated?", authUser);
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
         <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <Switch>
          {isAuthenticated()===false &&
            <Route exact path='/signin' component={SignIn}/>
          } 
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/activate/:token' component={ActivateUser}/>
            <Route exact path='/newMessage/:messageid' component={NewMessage}/>
            <Route exact path='/newPost/:postid' component={NewPost}/>


            <RestrictedRoute path={`${match.url}`} authUser={authUser} component={MainApp}/>
            {/*<RestrictedRoute path={`${match.url}`} authUser={authUser} component={MainApp}/> */}

          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale, navStyle, layoutType} = settings;
  const {initURL, authUser} = auth;
  return {locale, navStyle, layoutType, initURL, authUser}
};
export default connect(mapStateToProps, {setInitUrl, setThemeType, onNavStyleChange, onLayoutTypeChange, getUser})(App);

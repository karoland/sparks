import React from "react";
import {Route, Switch} from "react-router-dom";
import Profile from "./Profile";
import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route exact path={`${match.url}profile`} component={asyncComponent(() => import('./Profile'))}/>
      <Route exact path={`${match.url}user/:userId`} component={asyncComponent(() => import('./Profile'))}/>
      <Route exact path={`${match.url}user/:userId/sparks`} component={Profile}/>
      <Route exact path={`${match.url}user/:userId/about`} component={Profile}/>
      <Route exact path={`${match.url}user/:userId/following`} component={Profile}/>
      <Route exact path={`${match.url}user/:userId/followers`} component={Profile}/>
      <Route exact path={`${match.url}user/:userId/mail`} component={asyncComponent(() => import('./Mail'))}/>
      <Route exact path={`${match.url}users`} component={asyncComponent(() => import('./Users'))}/>
      <Route exact path={`${match.url}`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route exact path={`${match.url}error401`} component={asyncComponent(() => import('routes/errorPages/401'))}/>

      <Route component={asyncComponent(() => import('routes/errorPages/404'))}/>

    </Switch>
  </div>
);

export default App;

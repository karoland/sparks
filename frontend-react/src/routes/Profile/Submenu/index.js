import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

//      <Route exact path={`${match.path}/sparks`} component={asyncComponent(() => import('../../SamplePage'))}/>


const Submenu = () => (

  
    <Switch>
      <Route path='/user/:userId/sparks' component={asyncComponent(() => import('../../SamplePage'))}/>

    </Switch>


)

export default Submenu;

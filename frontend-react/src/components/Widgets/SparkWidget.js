import React from "react";
//import {Button} from "antd";
import Breakpoint from 'react-socks';

import Widget from "components/Widget/index";


const SparkWidget = (props) => {
  return (

    <Widget styleName="gx-blue-cyan-gradient gx-text-white" >

    <Breakpoint small down>
          <div>I will render only in mobile devices</div>
    </Breakpoint>

    <Breakpoint medium up>


      <span className="gx-widget-badge"> Napisz o... </span>
      <div className="gx-mt-2 gx-font-weight-light gx-text-center ">
      <p className="gx-fs-md gx-mb-3">Nowych wiadomości</p>
      <p className="gx-fs-md gx-mb-3">Nowych wiadomości</p>
      <p className="gx-fs-md gx-mb-3">Nowych wiadomości</p>
            <i className="icon icon-star gx-fs-xxl gx-mr-2"/>

      <p className="gx-fs-md gx-mb-3">Nowych wiadomości</p>
      <p className="gx-fs-md gx-mb-3">Nowych wiadomości</p>
      <p className="gx-fs-md gx-mb-3">Nowych wiadomości</p>

      </div>
          </Breakpoint>


    </Widget>
  );
};

export default SparkWidget;

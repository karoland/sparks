import React from "react";
import {Button} from "antd";

import Widget from "components/Widget/index";


const NewPhotosSmall = (props) => {
  return (
    <Widget styleName="gx-widget-bg" >
      <i className="icon icon-chat-new gx-fs-xxl gx-mr-2"/>
      {props.newMails ? 
        <span className="gx-fs-xxl gx-font-weight-semi-bold gx-mb-3 gx-mb-4">{props.newMails}</span>
        :
        <span className="gx-fs-xxl gx-font-weight-semi-bold gx-mb-3 gx-mb-4">0</span>

      }
      <p className="gx-fs-md gx-font-weight-semi-bold gx-mb-3 gx-mb-2">Nowych wiadomości</p>
      <Button className="gx-mb-0  gx-text-uppercase" onClick={props.gotoMessages} htmlType="submit">
        MOJA SKRZYNKA
      </Button>
    </Widget>
  );
};

export default NewPhotosSmall;

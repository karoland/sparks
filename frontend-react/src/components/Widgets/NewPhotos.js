import React from "react";
import {Button} from "antd";

import Widget from "components/Widget/index";


const NewPhotos = (props) => {
  return (
    <Widget styleName="gx-widget-bg">
      <i className="icon icon-chat-new gx-fs-xlxl gx-mr-3"/>
      {props.newMails ? 
        <span className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-3 gx-mb-sm-4">{props.newMails}</span>
        :
        <span className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-3 gx-mb-sm-4">0</span>

      }
      <p className="gx-fs-xxl gx-font-weight-semi-bold gx-mb-3 gx-mb-sm-4">Nowych wiadomości</p>
      <p>WYSYŁAJ I ODBIERAJ SEKRETNE WIADOMOŚCI</p>
      <p></p>
      <Button className="gx-mb-1 gx-text-uppercase" onClick={props.gotoMessages} htmlType="submit">
        Moja skrzynka
      </Button>
    </Widget>
  );
};

export default NewPhotos;

import React from "react";
import {Button, Avatar} from "antd";

import Widget from "components/Widget/index";

const WidgetProfile = (props) => {
  return (
    <Widget styleName="gx-card-full gx-text-center">
      <div className="gx-pt-4 gx-px-3">
        <div className="gx-separator gx-bg-primary"/>
        <h2 className="gx-mb-4">{props.user.name}</h2>

                {props.user.avatar ? 
                <Avatar className="gx-size-100" shape="square"  alt="..." src={props.user.avatar}/> :
                <Avatar className="gx-size-100" size={100} shape="square" icon="user"/>
                }

      </div>
      <Button type="primary" onClick={props.gotoProfile}
              className="gx-mt-sm-4 gx-fs-sm gx-btn-block gx-mb-0 gx-text-uppercase gx-border-radius-top-left-0 gx-border-radius-top-right-0"
              size="large" htmlType="submit" block>
        Mój profil
      </Button>
    </Widget>
  );
};

export default WidgetProfile;

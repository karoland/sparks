import React from "react";
import {Button, Avatar} from "antd";

import Widget from "components/Widget/index";

const WidgetProfileSmall = (props) => {
  return (
    <Widget styleName="gx-card-full gx-text-center">
      <div className="gx-pt-2 gx-px-3">
        <h3 className="gx-mb-2">{props.user.name}</h3>

                {props.user.avatar ? 
                <Avatar className="gx-size-50 gx-mb-2" shape="square"  alt="..." src={props.user.avatar}/> :
                <Avatar className="gx-size-50 gx-mb-2" size={100} shape="square" icon="user"/>
                }

      </div>
      <Button type="primary" onClick={props.gotoProfile}
              className="gx-mt-2 gx-fs-sm gx-btn-block gx-mb-0 gx-text-uppercase gx-border-radius-top-left-0 gx-border-radius-top-right-0"
              size="default" htmlType="submit" block>
        Mój profil
      </Button>
    </Widget>
  );
};

export default WidgetProfileSmall;

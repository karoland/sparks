import React from "react";
import {Avatar} from "antd";

import Widget from "components/Widget/index";

const MessageSmall = ({avatar, from, to, text}) => {
  return (
    <Widget styleName="gx-widget-bg">
        <div className="gx-mail-user-info gx-ml-0 gx-mb-3">
                
              <Avatar className="gx-size-40 gx-mr-3" alt="avatar" src={avatar}/>

              <div className="gx-sender-name">{from}

                <div className="gx-send-to gx-text-light-grey">do: {to}</div>
              </div>
            </div>

            <p>
              {text}
            </p>

    </Widget>
  );
};

export default MessageSmall;

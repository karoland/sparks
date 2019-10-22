import React from "react";
import {Avatar, Icon} from "antd";
//import DisplayDate from "components/DisplayDate/index";
const moment = require('moment');



const MailListItem = ({mail, onMailSelect, folder}) => {
  return (

    <div className="gx-module-list-item gx-mail-cell">
        <div className="gx-mail-user-info gx-ml-0 gx-mb-3" onClick={() => {
        onMailSelect(mail);
      }}>

              {!mail.from.user.avatar ?
                <Avatar
                  className="gx-avatar gx-bg-blue gx-size-40 gx-mr-3"> {mail.from.user.name.charAt(0).toUpperCase()}</Avatar> :
                <Avatar className="gx-size-40 gx-mr-3" alt="Alice Freeman"
                        src={mail.from.user.avatar.url}/>
              }

              <div className="gx-sender-name">{mail.from.user.name}
                <span className="gx-toolbar-separator">&nbsp;</span>
                <span className="gx-font-weight-normal gx-fs-md">
                  {`${moment(new Date(
                                mail.created
                            )).locale("pl").format('DD MMM, YYYY, HH:mm')}`}
                </span>
                {folder === 1 && mail.to.user &&
                <div className="gx-send-to gx-text-grey">do {mail.to.user.name}</div>
                }
                {folder === 1 && mail.to.address &&
                  <div className="gx-send-to gx-text-grey">do {mail.to.address}</div>
                }
 
           
                  <div className="gx-fs-md gx-font-weight-normal gx-text-grey">
                    {mail.to.isOpened ?
                      <Icon style={{color: "#6F789A"}}  type="eye" className="gx-mr-1"/>
                      :
                       <Icon style={{color: "#6F789A"}} type="eye-invisible" theme="filled" className="gx-mr-1"/>
                    }

                    <span> {mail.title} </span>
                  </div>

              </div>

         

            </div>

    </div>
  )
};






export default MailListItem;

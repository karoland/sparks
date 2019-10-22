import React from "react";
//import CustomScrollbars from 'util/CustomScrollbars'
//import { Scrollbars } from 'react-custom-scrollbars';

import MailListItem from "./MailListItem";

const MailList = ({mails, onMailSelect, folder}) => {
  return (
    <div className="gx-module-list gx-mail-list">

        {mails.map((mail, index) =>
          <MailListItem key={index} mail={mail} onMailSelect={onMailSelect} folder={folder}/>
        )}
      
    </div>
  )
};

export default MailList;

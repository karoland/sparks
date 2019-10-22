import React from "react";
//import moment from "moment";
//import 'moment/locale/pl';  // without this line it didn't work

const moment = require('moment');
require('moment/locale/pl');

moment.locale("pl");

//      return <p className="gx-text-grey gx-fs-sm gx-mb-0">{postDate.format("DD MMM, YYYY")}</p>


const DisplayDate = ({date}) => {
  const postDate = moment(date);
  const currentDate = moment(new Date());
  const duration = moment.duration(currentDate.diff(postDate));
  const minutes = (duration.asMinutes() | 0);
  const hours = (duration.asHours() | 0);

  switch (true) {
    case minutes === 0:
      return <p className="gx-text-grey gx-fs-sm gx-mb-0">Przed chwilą</p>;
    case minutes < 60:
      return <p className="gx-text-grey gx-fs-sm gx-mb-0">{minutes} min.</p>;
    case hours < 24:
      return <p className="gx-text-grey gx-fs-sm gx-mb-0">{hours} godz.</p>;
    default:
      return <p className="gx-text-grey gx-fs-sm gx-mb-0">{postDate.locale("pl").format("DD MMM, YYYY")}</p>
  }
};


export default DisplayDate;

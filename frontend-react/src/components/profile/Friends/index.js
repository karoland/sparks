import React from "react";
import Widget from "../../Widget/index";



const Friends = ({friendList}) => {
  return (
    <Widget styleName="gx-card-profile-sm"
            title={<span>Friends - 530 </span>}>
      <div className="gx-pt-2">
        <ul className="gx-fnd-list gx-mb-0">
          {friendList.map((user, index) =>
            <li className="gx-mb-2" key={index}>
              <div className="gx-user-fnd">
                <img alt="..." src={user.image}/>
                <div className="gx-user-fnd-content">
                  <h6>{user.name}</h6>
                </div>
              </div>
            </li>
          )
          }
        </ul>
        <span className="gx-text-primary gx-fs-md gx-pointer gx-d-block">See all friends <i
          className={`icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`}/></span>
      </div>
    </Widget>
  )
};
export default Friends;

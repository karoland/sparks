import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut, clearAllStates} from "appRedux/actions/Auth";

class UserInfo extends Component {


  handleLogout = (e) => {
    e.preventDefault();
        console.log("Props logout", this.props);
        this.props.userSignOut();
//        this.props.userSignIn(values);
      
  };

  giveFeedback = () => {
    console.log("Props logout", this.props);

  }
  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={this.handleLogout}> Wyloguj </li>

        <li onClick={this.giveFeedback}>Zgłoś uwagi</li>

      </ul>
    );

    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">

        {(this.props.authUser && this.props.authUser.avatar) ? 
            <Avatar className="gx-mr-3 " size={48} src={this.props.authUser.avatar}/> :

            <Avatar style={{color: "white"}} size={48} icon="user" className="gx-mr-3 "/> 
          }
       {/* <Avatar src='https://via.placeholder.com/150x150'
                className="gx-avatar gx-pointer" alt=""/> */}
      </Popover>
    )

  }
}

export default connect(null, {userSignOut, clearAllStates})(UserInfo);

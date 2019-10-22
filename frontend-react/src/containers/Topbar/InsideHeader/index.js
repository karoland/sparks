import React, {Component} from "react";
import {Layout, Menu} from 'antd';
import {connect} from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";

import languageData from "../languageData";
//import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
//import AppNotification from "components/AppNotification";
//import MailNotification from "components/MailNotification";
//import HorizontalNav from "../HorizontalNav";
import {Link} from "react-router-dom";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
//import IntlMessages from "../../../util/IntlMessages";
import { isAuthenticated } from "containers/auth";

const {Header} = Layout;

/*const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);*/



class InsideHeader extends Component {

  state = {
    searchText: '',
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
            this.props.switchLanguage(language)
          }>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };


  render() {
    console.log("INSIDE HEADER macxth", this.props)
  
//      let selkey="";
//      if(this.props.match.path==="./") selkey="sample"
//      if(this.props.match.path==="./") selkey="sample"

    return (
      <div className="gx-header-horizontal gx-inside-header-horizontal">
        
        <Header className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">

            {/*  <Link to="/" className=" gx-pointer gx-mr-3 gx-logo">
                <img alt="" src={require("assets/images/BDOG-Spark-Icon.png")}/></Link> */}

              <Menu
//            defaultOpenKeys={["sample"]}
 //               if(this.props.match.path==="./") 
            
             selectedKeys={[]}

              mode="horizontal">
   
          <Menu.Item className="gx-menu-title gx-mr-1" key="sample">

           <Link to="/" className="gx-font-weight-semi-bold gx-text-dark ">
            <img alt="" src={require("assets/images/heartySparkLogoIcon.png")} style={{width: "36px", height:"auto"}} /> Główna</Link>
           
          </Menu.Item>

          <Menu.Item className="gx-menu-title gx-mr-1" key="profile">
              <Link to={`/user/${isAuthenticated()._id}`} className="gx-font-weight-semi-bold gx-text-dark"><i className="icon icon-profile gx-mr-1"/>
              Mój Profil</Link>
          </Menu.Item>

          <Menu.Item key="users">
              <Link to="/users" className="gx-font-weight-semi-bold gx-text-dark"> <i className="icon icon-search-new gx-mr-1"/>
             Szukaj</Link>
          </Menu.Item>
  
      </Menu>


            {/*}  <div className="gx-header-horizontal gx-d-none gx-d-lg-block">
                <HorizontalNav/>
              </div> */}

              <ul className="gx-header-notifications gx-ml-auto"> 
                {/*<li className="gx-notify">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                           trigger="click">
                    <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                  </Popover>
                </li> */}

                <li className="gx-msg">
                  
                  <Link to={`/user/${isAuthenticated()._id}/mail`} className="gx-font-weight-semi-bold gx-text-dark">
                    <span className="gx-pointer gx-status-pos gx-d-block">
                      <i className="icon icon-chat-new"/>
                      {/*<span className="gx-status gx-status-rtl gx-small gx-orange"/> */}
                    </span>
                  </Link>
                </li>
        
                <li ><UserInfo authUser={this.props.authUser}/></li>
              </ul>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {locale, navCollapsed} = settings;
  return {locale, navCollapsed}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(InsideHeader);

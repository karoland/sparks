import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";

import { isAuthenticated } from "containers/auth";

//const SubMenu = Menu.SubMenu;

class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  render() {
//    const {pathname} = this.props;
//    const selectedKeys = pathname.substr(1);
//    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (

      <Menu
       // defaultOpenKeys={[defaultOpenKeys]}
//        selectedKeys={[selectedKeys]}
        mode="horizontal">

   
          <Menu.Item className="gx-menu-title" key="sample">
            <Link to="/sample">
              <IntlMessages id="sidebar.samplePage"/></Link>
          </Menu.Item>

          <Menu.Item key="profile">
              <Link to={`/user/${isAuthenticated()._id}`}><i className="icon icon-widgets"/>
              <IntlMessages id="menu.myProfile"/></Link>
          </Menu.Item>

          <Menu.Item key="users">
              <Link to="/users"> <i className="icon icon-search-new"/> 
              <IntlMessages id="menu.myProfile"/></Link>
          </Menu.Item>

          <Menu.Item key="users" className="gx-notify gx-notify-search">

                  <span className="gx-pointer gx-d-block">                      
                  </span>
                 
          </Menu.Item>

  
      </Menu>

    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {themeType, navStyle, pathname, locale} = settings;
  return {themeType, navStyle, pathname, locale}
};
export default connect(mapStateToProps)(HorizontalNav);


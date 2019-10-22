import React from "react";

class AppModuleHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      popoverOpen: false
    };
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const {placeholder, onChange, value} = this.props;

    return (
      <div className="gx-module-box-header-inner">
  
        <div className="gx-module-box-header-right">
          <span className="gx-fs-xl"> <i
            className="icon icon-apps gx-icon-btn"/></span>
          <span className="gx-fs-xl"><i
            className="icon icon-notification gx-icon-btn"/></span>
        </div>
      </div>
    )
  }
}

export default AppModuleHeader;

AppModuleHeader.defaultProps = {
  styleName: '',
  value: '',
  notification: true,
  apps: true
};

import React, {Component} from "react";
import {Icon} from "antd";
import ComposeMail from "components/mail/Compose/index";

import Widget from "components/Widget/index";

class MessageWidget extends Component {

  state = {
    composeMail: false,
    showMessage: false,
  }

  handleRequestClose = () => {
    this.setState({
      composeMail: false,
      showMessage: false,
      alertMessage: '',

    });
  };

onMailSend() {
    this.setState(
      {
        alertMessage: 'Mail Sent Successfully',
        showMessage: true,
        composeMail: false,

     //   folderMails: this.state.allMail.concat(data),
     //   allMail: this.state.allMail.concat(data)
      }
    );
  }

  render() {
console.log("PROPS On reciever", this.props.reciever)
    return (
<div>
      <Widget styleName="gx-card-full gx-dot-arrow-hover">
        <ComposeMail open={this.state.composeMail}
          onClose={this.handleRequestClose.bind(this)}
          onMailSend={this.onMailSend.bind(this)}
          reciever={this.props.reciever}
        />
        <div className="gx-media gx-align-items-center gx-flex-nowrap">
          <div className="gx-px-1 gx-build-box-lay">
            <Icon type="message" className="gx-pl-2" style={{ fontSize: '36px'}} theme="twoTone" twoToneColor="#E65384" />
          </div>
          <div className="gx-media-body gx-py-3 gx-pr-4 gx-build-box-lay-content">
            <p className="gx-mb-0 gx-text-grey gx-fs-sm">Skryte wspomnienie?</p>

            <p className="gx-mb-1 gx-text-grey gx-fs-sm">Wyznanie?</p>


            <h2 className="h4 gx-text-truncate gx-mb-1 gx-text-dark">Wyślij sekretną wiadomość</h2>

            <div className="gx-dot-arrow">
              <div className="gx-bg-secondary gx-hover-arrow" onClick={() => {
                    this.setState({composeMail: true})  }}>
                <i className="icon icon-long-arrow-right gx-text-white" />
              </div>
              <div className="gx-dot">
                <i className="icon icon-ellipse-v gx-text-secondary"/>
              </div>
            </div>
          </div>
        </div>



      </Widget>
      </div>
    );
  }
};

export default MessageWidget;

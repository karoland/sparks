import React from "react";
import {Avatar, Button} from "antd";
import CustomScrollbars from 'util/CustomScrollbars'
import { messageRead } from "appRedux/actions/Message";
import { connect } from 'react-redux';

const moment = require('moment');


//const options = [
//  'Odpowiedz',
//  'Usuń',
//];

class MailDetail extends React.Component {

  state = {
    showDetail: false
  };

/*  optionMenu = () => {
    return (
      <Menu id="long-menu">
        {options.map(option =>
          <Menu.Item key={option}>
            {option}
          </Menu.Item>,
        )}
      </Menu>)
  };*/

  componentDidMount() {
    if(this.props.folder === 0 && !this.props.mail.to.isOpened) {
      this.props.dispatch(messageRead(this.props.mail._id, this.props.messages))
    }
  }

  onReply = () => {
    const reciever = {"_id": this.props.mail.from.user._id, "name": this.props.mail.from.user.name}
    this.props.reply(reciever);
  }

  render() {
    const {mail, folder} = this.props;
//    console.log("MAIL DETAIL", mail, "Folder", folder)

    return (
      <div className="gx-module-detail gx-mail-detail">
        <CustomScrollbars className="gx-module-content-scroll">
          <div className="gx-mail-detail-inner">
            <div className="gx-mail-header">
                <i className="icon icon-arrow-left gx-icon-btn gx-mb-1 gx-mr-2" onClick={() => this.props.goBack()}/> 

              <div className="gx-mail-header-content gx-col gx-pl-0">
                <div className="gx-subject">
                  {mail.title}
                </div>
              </div>
              <div>
               </div>

              { folder === 0 &&
              <div className="gx-mail-header-actions">
                <Button type="default" className="gx-pointer gx-mb-0" onClick={this.onReply}>
                  <i className="icon icon-reply gx-mr-2 gx-fs-xl gx-d-inline-flex gx-vertical-align-middle"/>
                  <span className="gx-fs-sm"> Odpowiedz </span>
              </Button>

              </div>
              }
            </div>
            <hr/>

            <div className="gx-mail-user-info gx-ml-0 gx-mb-3">

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

                {mail.to.user? 
                  <div className="gx-send-to gx-text-grey">do {mail.to.user.name}</div>
                  : <div className="gx-send-to gx-text-grey">do {mail.to.address}</div>
                }
              </div>

            </div>
      

            <p>
              {mail.body}
            </p>

          </div>
        </CustomScrollbars>
      </div>
    );
  }
}



const mapStateToProps = ({message}) => {
  const { messages} = message;

  return {messages};
};

export default connect(mapStateToProps)(MailDetail);

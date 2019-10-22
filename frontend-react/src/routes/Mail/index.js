import React, {Component} from "react";
import {Button, Drawer, Menu, message} from "antd";
//import CustomScrollbars from "util/CustomScrollbars";

import { connect } from 'react-redux';

import mails from "./data/mails";
import folders from "./data/folders";
import MailList from "components/mail/MailList";
import ComposeMail from "components/mail/Compose/index";
//import AppModuleHeader from "components/AppModuleHeader/index";
import MailDetail from "components/mail/MailDetail/index";
//import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
//import Auxiliary from "util/Auxiliary";
import { isAuthorized } from "containers/auth/index";

import { getAllMessages } from "appRedux/actions/Message";

class Mail extends Component {

  MailSideBar = () => {
    return <div className="gx-module-side">

      <div className="gx-module-side-header">
        <div className="gx-module-logo">
          <i className="icon icon-chat gx-mr-4"/>
          Wiadomości
        </div>
      </div>

      <div className="gx-module-side-content">
          <div className="gx-module-add-task">
            <Button type="primary" className="gx-btn-block"
                    onClick={() => {
                      this.setState({composeMail: true})
                    }}>
              <i className="icon icon-edit gx-mr-2"/>
              NAPISZ</Button>
          </div>

          <ul className="gx-module-nav">
            {this.getNavFolders()}
            

          </ul>
      </div>
    </div>
  };

  onDeleteMail = () => {
    const mails = this.state.allMail.map(mail =>
      mail.selected && (mail.folder === this.state.selectedFolder) ?
        {...mail, folder: 4, selected: false,} : mail
    );
    this.setState({
      alertMessage: 'Mail Deleted Successfully',
      showMessage: true,
      selectedMails: 0,
      allMail: mails,
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
  };


  getNavFolders = () => {
    return folders.map((folder, index) =>
      <li key={index} onClick={() => {
        const userId= this.props.match.params.userId;
        const filterMails = this.props.messages.filter(mail => {
          if(folder.handle === "Inbox") {return (mail.to.folder === folder.handle && mail.to.user && mail.to.user._id===userId)}
          if(folder.handle === "Sent") {return (mail.from.folder === folder.handle && mail.from.user._id===userId)}
        });

        this.setState({
          selectedFolder: folder.id,
          noContentFoundMessage: 'No Mail found in selected folder',
          currentMail: null,
          loader: true,
          folderMails: filterMails
        });
        setTimeout(() => {
          this.setState({loader: false});
        }, 1500);
      }
      }>
        <span className={`${this.state.selectedFolder === folder.id ? 'active gx-link' : 'gx-link'}`}>
          <i className={`icon icon-${folder.icon}`}/>
          <span className="gx-mr-1">{folder.title}</span>
          {folder.handle==="Inbox" &&
          <span>
            <span className="gx-font-weight-bold"> {this.state.inboxNew} </span>
            <span> /{this.state.inboxTotal}</span>
            </span>
          }  
        </span>
        
      </li>
    )
  };

  handleRequestClose = () => {
    this.setState({
      composeMail: false,
      showMessage: false,
      replyReciever:undefined,
    });
  };
  

  onMailSend() {
    this.setState(
      {
          composeMail: false,
          replyReciever: undefined,
          key: this.state.key + 1,

//        alertMessage: 'Mail Sent Successfully',
//        showMessage: true,
//        folderMails: this.props.messages,
//        selectedFolder: 1,
//        currentMail: null,
        //allMail: this.state.allMail.concat(data)
      }
    );
  //  this.getNavFolders();
  }

 componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
  if (nextProps.readMessage !== this.props.readMessage) {
    this.setState({currentMail: nextProps.readMessage})
  }
  if (nextProps.messages !== this.props.messages) {
    const userId= this.props.match.params.userId;
//    console.log("Dodartłam tu, zmieniam folder", userId, "selectedFolder", this.state.selectedFolder, "nextprops", nextProps.messages)

    this.setState({
        folderMails : nextProps.messages.filter(mail => {
          if(this.state.selectedFolder === 0) {return (mail.to.folder === "Inbox" && mail.to.user && mail.to.user._id===userId)}
          if(this.state.selectedFolder === 1) {return (mail.from.folder === "Sent" && mail.from.user._id===userId)}
        })
    })
  }
  }

  displayMail = (currentMail, folderMails, noContentFoundMessage) => {
    return (<div className="gx-module-box-column ">
      {currentMail === null ?
        folderMails.length === 0 ?
          <div className="gx-no-content-found gx-text-light gx-d-flex gx-align-items-center gx-justify-content-center gx-mt-4">
            Brak wiadomości w tym folderze
          </div>
          :
          <MailList mails={folderMails} folder={this.state.selectedFolder}
                    onMailSelect={this.onMailSelect.bind(this)}
                    />
        :
        <MailDetail mail={currentMail} folder={this.state.selectedFolder} reply={this.reply.bind(this)}
                    goBack={() => {
                    this.setState({currentMail: null})
                  }}/>}
    </div>)
  };


  folderMenu = () => (
    <Menu id="folder-menu"
          onClick={this.onFolderMenuItemSelect.bind(this)}>
      {folders.map(folder =>
        <Menu.Item key={folder.id}>
          {folder.title}
        </Menu.Item>,
      )}
    </Menu>);

  constructor() {
    super();
    this.state = {
      searchMail: '',
      noContentFoundMessage: 'Brak wiadomości w tym folderze',
      alertMessage: '',
      showMessage: false,
      drawerState: false,
      key: 1,
      replyReciever: undefined,
      anchorEl: null,
      allMail: mails,
      loader: false,
      user: {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        avatar: 'https://via.placeholder.com/150x150'
      },
      firstFolder: false,
      loadingFirstFolder: true,
      selectedMails: 0,
      selectedFolder: 0,
      currentMail: null,
      composeMail: false,
      inboxTotal:0,
      inboxNew:0,
//      folderMails: mails.filter(mail => mail.folder === "Inbox")

    }
  }

  componentDidMount() {
   if(isAuthorized(this.props.match.params.userId)) {
      const userId = this.props.match.params.userId;
      this.props.dispatch(getAllMessages(userId));

      setTimeout(() => {
        this.setState({loader: false});
      }, 1500);
    } else this.props.history.push("/error401")
  }


  onMailSelect(mail) {
    this.setState({
      loader: true,
      currentMail: mail,
    });
    if(!mail.to.isOpened && this.state.inboxNew>0) {
      this.setState({inboxNew : this.state.inboxNew-1})
    }

    setTimeout(() => {
      this.setState({loader: false});
    }, 1500);
  }


  updateSearch(evt) {
    this.setState({
      searchMail: evt.target.value,
    });
    this.searchMail(evt.target.value)
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState
    });
  }

  firstFolder = (callback) => {
    console.log("First load")
    if(this.props.messages) {
      const userId = this.props.match.params.userId;
      this.setState({
        folderMails: this.props.messages.filter(mail => mail.to.folder === "Inbox" && mail.to.user && mail.to.user._id===userId),
        selectedFolder: 0,
      })
    }

    callback();
  }


  loadFirtsFolder= ()=> {

    console.log("Inbox load", "FolderMails", this.state.folderMails)
    if(this.props.messages) {
      const userId = this.props.match.params.userId;
      this.setState({
//        inboxNew: (this.state.folderMails ? this.state.folderMails.filter(mail => mail.to.isOpened === false).length : 0),
        folderMails: this.props.messages.filter(mail => mail.to.folder === "Inbox" && mail.to.user && mail.to.user._id===userId),
        selectedFolder: 0,
        
        inboxTotal: this.props.messages.filter(mail => mail.to.folder === "Inbox" && mail.to.user && mail.to.user._id===userId).length,
        inboxNew: this.props.messages.filter(mail => mail.to.folder === "Inbox" && mail.to.user && !mail.to.isOpened && mail.to.user._id===userId).length,
        loadingFirstFolder: false,
      })
    }    

    return (
      null
    )
  }

  reply = (reciever) => {
  //  console.log("Reply to reciever", reciever)
    this.setState({replyReciever: reciever})    
    this.setState({composeMail: true})
  }

  render() {
    const {loadingFirstFolder, loader, currentMail, selectedFolder, drawerState, folderMails, composeMail, user, alertMessage, showMessage, noContentFoundMessage} = this.state;
    const {messages} = this.props;
    console.log("inboxTotal", this.state.inboxTotal, "inboxNew", this.state.inboxNew, "FolderMails", folderMails)

    return (

      <div className="gx-main-content">
      <ComposeMail open={composeMail} user={user}
                           onClose={this.handleRequestClose.bind(this)}
                           onMailSend={this.onMailSend.bind(this)}
                           messages={messages}
                
                           reciever={this.state.replyReciever}/>
        
        { messages &&
        
        <div className="gx-app-module">
        
          <div className="gx-d-block gx-d-lg-none">
            <Drawer
              placement="left"
              closable={false}
              visible={drawerState}
              onClose={this.onToggleDrawer.bind(this)}>
              {this.MailSideBar()}
            </Drawer>

          </div>
          <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
            {this.MailSideBar()}
          </div>

          <div className="gx-module-box">
            
            <div className="gx-module-box-header">
              <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                  <i className="icon icon-menu gx-icon-btn" aria-label="Menu"
                     onClick={this.onToggleDrawer.bind(this)}/>
              </span>
              {currentMail ?
               <h4 className="gx-text-grey"> Szczegóły wiadomości </h4>
               :
               <div>
                {selectedFolder===0 && <h4 className="gx-text-grey"> Wiadomości otrzymane </h4> }
                {selectedFolder===1 && <h4 className="gx-text-grey"> Wiadomości wysłane </h4> } 
               </div>
             }

            {/*  <AppModuleHeader placeholder="Search mails" user={this.state.user}
                               onChange={this.updateSearch.bind(this)}
                               value={this.state.searchMail}/> */}
            </div>

            <div className="gx-module-box-content  ">
              {loadingFirstFolder ?
                this.loadFirtsFolder() :
                <div>
                {loader ?
                  <div className="gx-loader-view">
                    <CircularProgress/>
                  </div>
                  : this.displayMail(currentMail, folderMails, noContentFoundMessage)
                }
                </div>
              }

              
            </div>

          </div>
        

        </div>
        }  
        {showMessage && message.info(<span id="message-id">{alertMessage}</span>, 3, this.handleRequestClose)}
      </div>
    )
  }
}


const mapStateToProps = ({message}) => {
  const { messages, success} = message;

  return {messages, success};
};

export default connect(mapStateToProps)(Mail);
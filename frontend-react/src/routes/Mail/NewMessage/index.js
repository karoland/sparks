import React from "react";
import {Button, Avatar, Row, Col, Alert, Spin} from "antd";
import {connect} from "react-redux";
//import {Link} from "react-router-dom";
import DisplayDate from "components/profile/DisplayDate/index";
import MessageSmall from "components/Widgets/MessageSmall";
import {
  getMessage,
} from "appRedux/actions/Message";
//import { Redirect} from "react-router-dom";

import IntlMessages from "util/IntlMessages";
//import CircularProgress from "components/CircularProgress/index";
import { isAuthorized } from "containers/auth";
//import CustomScrollbars from "util/CustomScrollbars";
import {userSignOut} from "appRedux/actions/Auth";
//import axios from 'util/Api'
//import {Scrollbars} from "react-custom-scrollbars";

class NewMessage extends React.Component {

componentDidMount() {
    this.props.dispatch(getMessage(this.props.match.params.messageid));
  }

  recieverisLoginUser = () => {
    if(this.props.getMessage.message.to.user) {
      if(isAuthorized(this.props.getMessage.message.to.user._id)) {console.log("Same user"); return "sameUser"}
        //console.log("User user", authorized)
      if(!isAuthorized(this.props.getMessage.message.to.user._id)) {
          console.log("another User")
          return "anotherUser"
        }
    }
    else {
      console.log("User mail")
      return "mailUser"
    }
  }

    signOutCurrentUser = (callback) => {
      this.props.dispatch(userSignOut());
      console.log("Signout")
      callback();
    }

    goToRegister = () => {
       console.log("Signout; Save message and Going to Register")
        this.signOutCurrentUser(() => {
          //save message
         // axios.post('/savemessage', { messageid: this.props.getMessage.message._id})
         //   .then(response => {
         //     console.log("OK", response.data)
         //   })

          //move to signup
          this.props.history.push({
            pathname: '/signup',
            state: { mail: this.props.getMessage.message.to.address }
          })
      });
    }

  goToLogin = () => {
        console.log("Signout, if someone logged; Going to signin")
        this.signOutCurrentUser(() => {
          //move to signin
          this.props.history.push({
            pathname: '/signin',
            state: { mail: this.props.getMessage.message.to.user.email }
          })
    });    
  }

  goToMessages = () => {
    console.log("Redirecting")
    this.props.history.push(`/user/${this.props.getMessage.message.to.user._id}/mail`); 
 }


  render() {
    const {error} = this.props;
    const {getMessage, authUser} = this.props;
    const {loading} = this.props;
    console.log("NEWMESSAGE authUser", authUser)

  let recieverisLoginUser=""
  if(getMessage && getMessage.message) recieverisLoginUser = this.recieverisLoginUser();

    return (
      
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">


          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src="https://via.placeholder.com/272x395" alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <p>Jesteś w miejscu, które zawsze przypomni Ci, jak jesteś niesamowity.</p>
                <p>Wyznaj to, co skryte. <br/> Łap i przesyłaj iskierki serdeczności.</p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
            </div>
            <div className="gx-app-login-content">

            {getMessage && getMessage.message  &&

              <div>
                <div className="gx-mb-2">
                  <h2>Masz nową sekretną wiadomość!</h2>
                </div>
                <div className="gx-module-detail gx-mail-detail gx-mb-0">

                  <div className="gx-mail-header-content gx-col gx-pl-0 gx-mb-0">
                    <div className="gx-subject gx-mb-0">
                      <span className="gx-font-weight-semi-bold"> Tytuł: </span>
                      <span>{getMessage.message.title} </span>
                      
                    </div>
                  </div>
                  <hr/>

                  <div className="gx-mail-user-info gx-ml-0 gx-mb-2 gx-mt-0">
                    {!getMessage.message.from.user.avatar ?
                      <Avatar
                        className="gx-avatar gx-bg-grey gx-size-40 gx-mr-3"> {getMessage.message.from.user.name.charAt(0).toUpperCase()}</Avatar> :
                      <Avatar className="gx-size-40 gx-mr-3" alt="Alice Freeman"
                              src={getMessage.message.from.user.avatar.url}/>
                    }
                    <div className="gx-sender-name">{getMessage.message.from.user.name}
                    {/*  <span className="gx-toolbar-separator">&nbsp;</span> */}
                      <div className="gx-font-weight-normal gx-fs-md">
                        <DisplayDate date={getMessage.message.created}/>
                      </div>
                     {/* <div className="gx-send-to gx-text-grey">to me</div> */}
                    </div>
                  </div>
                  <p style={{whiteSpace: "pre-line"}}>
                    {getMessage.message.body}
                  </p>
                </div>

                  { recieverisLoginUser === "mailUser" &&
                  <div style={{textAlign: 'center'}} className="gx-mt-4 gx-mb-0">
                   <Button type="primary" size="large" className="gx-mb-0" onClick={this.goToRegister}>
                      Zachowaj wiadomość w profilu
                    </Button>
                    <p className="gx-mt-0 gx-font-weight-light"> Zapisz w swojej księdze wspomnień</p>
                  </div>
                  }
                  { recieverisLoginUser === "anotherUser" &&
                  <div style={{textAlign: 'center'}} className="gx-mt-4 gx-mb-0">
                    <Button type="primary" size="large" className="gx-mb-0" onClick={this.goToLogin}>
                      Przejdź do profilu
                    </Button>
                  </div>
                  }
                  { recieverisLoginUser === "sameUser" &&
                  <div style={{textAlign: 'center'}} className="gx-mt-4 gx-mb-0">
                    <Button type="primary" size="large" className="gx-mb-0" onClick={this.goToMessages}>
                      Przejdź do wiadomości
                    </Button>
                  </div>
                  }

                
              </div>
            }

            {getMessage && !getMessage.message &&
            <div className="gx-text-center">
              <Alert  message="Wiadomość nie istnieje" type="error" description={<p>Nie można odnaleźć wiadomości.</p>}/>
              <Button className="gx-mt-4" type="primary" onClick={()=>{this.props.history.push("/") }}> Przejdź do profilu</Button>
            </div>
            }

            {loading ?
              <div className="gx-text-center">
                <div className="">
                  <Spin size="large"/>
                </div>
              </div> 
              : null}

            {error &&
              <div className="gx-text-center">
                <Alert  message="Błąd połączenia" type="error" description={<p>Nie udało się odczytać wiadomości.<br/> Spróbuj ponownie później lub przejdź do profilu.</p>}/>
                <Button className="gx-mt-4" type="primary" onClick={()=>{this.props.history.push("/") }}> Przejdź do profilu</Button>

              </div> 
            }


          </div>


          </div>
          <p  style={{textAlign: 'center'}}> Wiadomości innych użytkowników: </p>
          <Row className="gx-mt-4">
            <Col xl={8} md={8} sm={8} xs={24}>
              <MessageSmall from={"Karolina Stasiak"} to={"Marcin Kidoń"} 
                  text={"Zawsze chciałem Ci powiedzieć, że jesteś najfajnieszą babką"}
                  avatar={"http://res.cloudinary.com/dl5rerj8g/image/upload/v1568195258/1568195252171.jpg"} />
            </Col>
            <Col xl={8} md={8} sm={8} xs={24}>
              <MessageSmall from={"Karolina Stasiak"} to={"Marlena"}
                  text={"Zawsze chciałem Ci powiedzieć, że jesteś najfajnieszą babką"}
                  avatar={"http://res.cloudinary.com/dl5rerj8g/image/upload/v1568195258/1568195252171.jpg"} />
            </Col>
            <Col xl={8} md={8} sm={8} xs={24}>
              <MessageSmall from={"Karolina Stasiak"} to={"Stasiu Biel"}
                  text={"Zawsze chciałem Ci powiedzieć, że jesteś najfajnieszą babką"} avatar={"http://res.cloudinary.com/dl5rerj8g/image/upload/v1568195258/1568195252171.jpg"} />
            </Col>
          </Row>

        </div>
      </div>

    );
  }
}



const mapStateToProps = ({message, commonData, auth}) => {
  const { getMessage} = message;
  const { loading, error} = commonData;
  const {authUser } =auth;

  return {getMessage, loading, error, authUser};
};

export default connect(mapStateToProps)(NewMessage)


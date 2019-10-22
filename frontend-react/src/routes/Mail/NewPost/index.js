import React from "react";
import {Button, Avatar, Row, Col, Alert, Spin} from "antd";
import {connect} from "react-redux";
//import {Link} from "react-router-dom";
import DisplayDate from "components/profile/DisplayDate/index";
import MessageSmall from "components/Widgets/MessageSmall";
import {
  getPost,
} from "appRedux/actions/Message";
//import { Redirect} from "react-router-dom";

import IntlMessages from "util/IntlMessages";
//import CircularProgress from "components/CircularProgress/index";
import { isAuthorized } from "containers/auth";
//import CustomScrollbars from "util/CustomScrollbars";
import {userSignOut} from "appRedux/actions/Auth";
//import axios from 'util/Api'
//import {Scrollbars} from "react-custom-scrollbars";

class NewPost extends React.Component {

componentDidMount() {
    this.props.dispatch(getPost(this.props.match.params.postid));
  }


  recieverisLoginUser = () => {
    const reciever = this.props.getPost.message.participants.find(obj => obj.part === "Reciever");    
    console.log("RECIEVER", reciever)

    if(reciever.delivery==="User") {
      if(isAuthorized(reciever.user._id)) {console.log("Same user"); return "sameUser"}
        //console.log("User user", authorized)
      if(!isAuthorized(reciever.user._id)) {
          console.log("another User")
          return "anotherUser"
        }
    }
    if(reciever.delivery==="Email") {
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
          const reciever = this.props.getPost.message.participants.find(obj => obj.part === "Reciever");    

          this.props.history.push({
            pathname: '/signup',
            state: { mail: reciever.address }
          })
      });
    }

  goToLogin = () => {
        console.log("Signout, if someone logged; Going to signin")
        this.signOutCurrentUser(() => {
          //move to signin
          const reciever = this.props.getPost.message.participants.find(obj => obj.part === "Reciever");    

          this.props.history.push({
            pathname: '/signin',
            state: { mail: reciever.user.email }
          })
    });    
  }

  goToMessages = () => {
    console.log("Redirecting")
    //const reciever = this.props.getPost.message.participants.find(obj => obj.part === "Reciever");    

    this.props.history.push("/"); 
 }


  render() {
    const {error} = this.props;
    const {getPost} = this.props;
    const {loading} = this.props;

  let recieverisLoginUser=""
  let author=undefined;
  let reciever=undefined;
  if(getPost && getPost.message) {
    console.log("PROPS", getPost.message);
    recieverisLoginUser = this.recieverisLoginUser();
    author = getPost.message.participants.find(obj => obj.part === "Author").user;
    reciever = getPost.message.participants.find(obj => obj.part === "Reciever"); 
  }

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

            {getPost && getPost.message  &&

              <div>
                <div className="gx-mb-2">
                  <h2>Masz nową iskierkę sympatii!</h2>
                </div>
                <div className="gx-module-detail gx-mail-detail gx-mb-0">

                  <div className="gx-mail-user-info gx-ml-0 gx-mb-2 gx-mt-0">
                    {!author.avatar ?
                      <Avatar
                        className="gx-avatar gx-bg-grey gx-size-40 gx-mr-3"> {author.name.charAt(0).toUpperCase()}</Avatar> :
                      <Avatar className="gx-size-40 gx-mr-3" alt="Alice Freeman"
                              src={author.avatar.url}/>
                    }
                    <div className="gx-sender-name">{author.name}
                    {/*  <span className="gx-toolbar-separator">&nbsp;</span> */}
                      <p className="gx-font-weight-normal gx-fs-md">
                      <DisplayDate date={getPost.message.created}/>
                      </p>
                     {/* <div className="gx-send-to gx-text-grey">to me</div> */}
                    </div>
                  </div>
                  <p style={{whiteSpace: "pre-line"}}>
                    {getPost.message.body}
                  </p>
                </div>

                  { recieverisLoginUser === "mailUser" &&
                  <div style={{textAlign: 'center'}} className="gx-mt-4 gx-mb-0">
                   <Button type="primary" size="large" className="gx-mb-0" onClick={this.goToRegister}>
                      Zachowaj wpis w profilu
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
                      Przejdź do profilu
                    </Button>
                  </div>
                  }

                
              </div>
            }

            {getPost && !getPost.message &&
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



const mapStateToProps = ({message, commonData}) => {
  const { getPost} = message;
  const { loading, error} = commonData;

  return {getPost, loading, error};
};

export default connect(mapStateToProps)(NewPost)


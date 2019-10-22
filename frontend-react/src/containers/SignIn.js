import React from "react";
import {Button, Form, Icon, Input, message, Popover} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
//import {Redirect} from "react-router-dom";

import {
  hideError,
  showAuthLoader,
  userFacebookSignIn,
  userSignIn,
  userTwitterSignIn
} from "appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
//import { isAuthenticated } from "containers/auth";
import { messages } from "lngProvider/messages";
import {injectIntl} from "react-intl";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "containers/Topbar/languageData";
import {switchLanguage} from "appRedux/actions/Setting";


const FormItem = Form.Item;

class SignIn extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.showAuthLoader();
        this.props.userSignIn(values);

      }
    });
  };




  signinAndRedirect = async (values, callback) => {
    console.log("Signin in callback")
    await this.props.userSignIn(values);
    callback();
  }

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

componentDidUpdate() {
    if (this.props.error) {
      this.messageError(this.props.error);
      this.props.hideError();
    }
 //   if (isAuthenticated()) {
 //     this.props.history.push('/');
 //   }
  }

 // componentDidUpdate() {
   /* if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    } */
  //  if (isAuthenticated()) {
  //    this.props.history.push('/');
  //  }
  //}
  messageError = (error) => {
    let dis=""
    switch (error) {
      case "Email not found":
        dis =  this.props.intl.formatMessage(messages.signinErrorEmailNotFound);
        break;
      case "Email and password do not match":
        dis =  this.props.intl.formatMessage(messages.signinErrorIncorrectPassword);
        break;
      default:
        dis=this.props.intl.formatMessage(messages.signinErrorGeneral);
    }
      message.error(dis, 3);
    };

  render() {
    console.log("Authuser", this.props.authUser);
    const {getFieldDecorator} = this.props.form;
    
    const {loading, locale} = this.props;


//    if (this.props.authUser !==null) return <Redirect to={{pathname: "/"}} />;


    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">

          <div className="gx-language" style={{display: "flex", justifyContent: "flex-end", paddingBottom: "10px"}}>
            <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={this.languageMenu()}
                     trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center">
                <i className={`flag flag-24 flag-${locale.icon}`}/>
                <span className="gx-pl-2 gx-language-name">{locale.name}</span>
                <i className="icon icon-chevron-down gx-pl-2"/>
              </span>
            </Popover>
          </div>

          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src="https://via.placeholder.com/272x395" alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p><IntlMessages id="app.userAuth.getAccount"/></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
            </div>
            <div className="gx-app-login-content">
              
              <div className="gx-mb-4">
                <h2><IntlMessages id="app.userAuth.signIn"/></h2>
              </div>

              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: <IntlMessages id="app.form.error.invalidEmail"/>,
                    }],
                    initialValue: (this.props.location.state && this.props.location.state.mail) ? this.props.location.state.mail : ''
                  })(
                    <Input placeholder={this.props.intl.formatMessage(messages.appFormEmail)}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                  )}
                </FormItem>
                <FormItem >
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: <IntlMessages id="app.form.error.emptyPassword"/>}],
                  })(
                    <Input type="password" 
                    placeholder={this.props.intl.formatMessage(messages.appFormPassword)}
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                  )}
                </FormItem>


                <FormItem className="gx-mb-0">
                  <Button type="primary" className="gx-mb-1" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn"/>
                  </Button>

                </FormItem>

                  <span className="gx-mr-1">
                    <IntlMessages id="app.form.newUser"/>
                  </span> 
                  <Link to="/signup"><IntlMessages id="app.userAuth.signUp"/></Link>
                
              </Form>

              <div className="gx-flex-row gx-mt-3 gx-pt-1 gx-pr-2 gx-justify-content-end" style={{backgroundColor: "#ebfaf8"}}>
                  <span className="gx-mt-2 gx-mr-3"><IntlMessages id="app.form.registerSocial"/></span>
                  <ul className="gx-social-link gx-mb-1">
                    <li>
                      <Icon type="facebook" onClick={() => {
                        this.props.userFacebookSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="twitter" onClick={() => {
                        this.props.userTwitterSignIn();
                      }}/>
                    </li>
                  </ul>
              </div>



            </div>

            {loading ?
              <div className="gx-loader-view">
                <CircularProgress/>
              </div> : null}
          
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth, settings, commonData}) => {
  const {authUser, token} = auth;
  const { error, loading, message} = commonData;

  const {locale} = settings;

  return {loading, error, message, authUser, token, locale}
};

export default injectIntl(connect(mapStateToProps, {
  userSignIn,
  hideError,
  showAuthLoader,
  userFacebookSignIn,
  userTwitterSignIn,
  switchLanguage
})(WrappedNormalLoginForm));

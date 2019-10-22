import React from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Link} from "react-router-dom";
import {injectIntl } from "react-intl";
import {Popover, Spin} from "antd";

import {connect} from "react-redux";
import {
  userSignUp,
  hideError,
  showAuthLoader,
  userFacebookSignIn,
  userTwitterSignIn,
  successViewed,
} from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import { messages } from "lngProvider/messages";

import {message} from "antd/lib/index";
//import CircularProgress from "components/CircularProgress/index";
import Image from "assets/images/Resized_20181216_232526.jpeg";
//import { isAuthenticated } from "containers/auth";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "containers/Topbar/languageData";
import {switchLanguage} from "appRedux/actions/Setting";
import SweetAlert from "react-bootstrap-sweetalert";

//import { FacebookProvider, LoginButton } from 'react-facebook';

const FormItem = Form.Item;
//const {Header} = Layout;


class SignUp extends React.Component {

  state = {
    confirmDirty: false,
    successAlert: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
        this.props.userSignUp(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(<IntlMessages id="app.form.error.passwordsInconsistent"/>);
    } else {
      callback();
    }
  };

 // app.form.error.passwordsInconsistent

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  onConfirm = () => {
    this.setState({
      successAlert: false     
    });
    this.props.successViewed();
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

  componentDidUpdate() {
    if (this.props.error) {
      this.messageError(this.props.error);
      this.props.hideError();
    }

 
  }

   componentWillReceiveProps(nextProps) {
      this.setState({'successAlert': nextProps.success})
  }

  successAlert = () => {

  }

  messageError = (error) => {
    let dis=""
    switch (error) {
      case "Request failed with status code 403":
        dis =  this.props.intl.formatMessage(messages.signupErrorEmailTaken);
        break;
      default:
        dis=this.props.intl.formatMessage(messages.signupErrorGeneral);
    }
      message.error(dis, 3);
    };




responseFacebook = (response) => {
  console.log(response);
}

componentClicked = () => {
 console.log("FB"); 
}
  render() {

    const {getFieldDecorator} = this.props.form;
    const {loading, locale} = this.props;
    const {successAlert} = this.state;

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
                <img src={Image} alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p><IntlMessages id="app.userAuth.getAccount"/></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
              </div>

            <div className="gx-app-login-content">
              
              <div className="gx-mb-4">
                <h2><IntlMessages id="app.userAuth.signUp"/></h2>
              </div>
              
              <Form onSubmit={this.handleSubmit} className="gx-signup-form gx-form-row0 gx-mb-4">
                <FormItem > 
                  {getFieldDecorator('name', {
                    rules: [{required: true, message:<IntlMessages id="app.form.error.emptyUsername"/>  }],
                  })(
                    <Input 
                    placeholder={this.props.intl.formatMessage(messages.appFormUsername)}
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                  )}
                </FormItem>

                <FormItem >
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: <IntlMessages id="app.form.error.invalidEmail"/>
                    }],
                    initialValue: (this.props.location.state && this.props.location.state.mail) ? this.props.location.state.mail : ''
                  })(
                    <Input 
                    placeholder={this.props.intl.formatMessage(messages.appFormEmail)}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {required: true, message: <IntlMessages id="app.form.error.emptyPassword"/>},
                      {validator: this.validateToNextPassword, },
                    ],
                  })(
                    <Input type="password" 
                    placeholder={this.props.intl.formatMessage(messages.appFormPassword)}
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                  )}
                </FormItem>

                <FormItem hasFeedback className="gx-mb-1">
                  {getFieldDecorator('confirm', {
                    rules: [
                      {required: true, message: <IntlMessages id="app.form.error.emptyPassword"/>},
                      {validator: this.compareToFirstPassword, },
                    ],
                  })(
                    <Input 
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                    placeholder={this.props.intl.formatMessage(messages.appFormConfirmPassword)}
                    onBlur={this.handleConfirmBlur}
                    />
                  )}
                </FormItem>
                <FormItem className="gx-mb-2">
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox><IntlMessages id="app.form.iAccept"/></Checkbox>
                  )}
                  <span className="gx-link gx-pl-0"><IntlMessages
                    id="app.form.termAndCondition"/></span>
                </FormItem>

                <FormItem className="gx-mb-0" >
                  <Button type="primary" htmlType="submit" className="gx-mb-1">
                    <IntlMessages id="app.userAuth.signUp"/>
                  </Button>

                </FormItem>

               
                  <span className="gx-mr-1">
                    <IntlMessages id="app.form.or"/>
                  </span> 
                  <Link to="/signin"><IntlMessages id="app.userAuth.signIn"/></Link>
                              
                
              </Form>

            </div>
          
            {loading &&
            <div className="gx-loader-view">
              <Spin/>
            </div>
            }
            {successAlert &&
                      <SweetAlert success title={this.props.intl.formatMessage(messages.activationEmailSent)}
                        onConfirm={this.onConfirm}>
                    {this.props.intl.formatMessage(messages.activationEmailSentDescription)}
                    </SweetAlert>
            }

            
            


          </div>
        </div>
      </div>

    );
  }

}

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({auth, commonData, settings}) => {
  const { resetToken, success} = auth;
  const { error, loading, message} = commonData;
  const {locale} = settings;


  return {resetToken, error, loading, message, locale, success}
};

export default injectIntl(connect(mapStateToProps, {
  userSignUp,
  hideError,
  showAuthLoader,
  userFacebookSignIn,
  userTwitterSignIn,
  switchLanguage,
  successViewed
})(WrappedSignUpForm));

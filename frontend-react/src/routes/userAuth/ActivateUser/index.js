import React, { Component } from "react";
import { Button, Alert } from "antd";
import IntlMessages from "util/IntlMessages";
import {injectIntl } from "react-intl";
import { messages } from "lngProvider/messages";
import {message} from "antd/lib/index";
import { connect } from 'react-redux';

import axios from 'util/Api'
import {Redirect} from "react-router-dom";
//import { Link } from "react-router-dom";
import {
  userSignOut,
  userAutoSignIn
} from "appRedux/actions/Auth";
//import SweetAlert from "react-bootstrap-sweetalert";

import { Icon, Form, Input, Spin } from 'antd';
const FormItem = Form.Item;


class ActivateUser extends Component {

  state = {
        activateToken: this.props.match.params.token,
        loading: true,
        email: '',
        name: '',
        error: false,
        activated_before: false,
        success: '',
        goToApp: false,
        connError: false,
        errorMail:false,
        successMail:false,
  }

  enterApp = () => {
    console.log("Clicked");
     this.setState({ goToApp: true})
     this.props.dispatch(userAutoSignIn({"email": this.state.email}));

  };

  relod = () => {
    console.log("Clicked");
    this.setState({loading: true, error: false, connError:false});
    this.activateUser();
  }

  componentDidMount() {
    this.activateUser();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({successMail: false})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.email);
        axios.post('/users/activation_link', { email: values.email })
        .then(response => {
         console.log("Mail response", response)
          if(response.data.error==="Email not found")  {message.error(this.props.intl.formatMessage(messages.signinErrorEmailNotFound), 3);}
          if(response.data.success===true) {this.setState({successMail: true})}

        }).catch(error => this.setState({ connError: true, loading: false }));
      }
    })
  };


  activateUser = () => {
    axios.post('/users/activate_user', { resetToken: this.state.activateToken })
    .then(response => {
        console.log("Response", response)
        if(!response.data.userdata){
          //this.setState({error: true})
          if(response.data.active===true) {this.setState({activated_before: true, error: false, loading:false})}
          //this.setState({error: true})
          if(response.data.success===false) {this.setState({activated_before: false, error: true, loading:false})}
         // if(response.data.success===true)
        } else {
            this.setState({
              error:false,
              loading:false,
              activated_before: false, 
              success: true, 
              email: response.data.userdata.email, 
              name: response.data.userdata.name
            });
              this.logoutLiveUser();
              //loginNewUser
          }
      }
    ).catch(error => this.setState({ connError: true, loading: false }));
    
    
  }

  logoutLiveUser = () => {
   // const token = JSON.parse(localStorage.getItem("token"));
    this.props.dispatch(userSignOut())
    .then(response => {
              console.log("Response", response)

    })
  }

  render() {
    const {error, success, activated_before, email, name, goToApp, loading, connError, successMail} = this.state;
    const {getFieldDecorator} = this.props.form;


    if (goToApp) return <Redirect to={{pathname: "/"}} />;


    return (
      <div className="gx-login-container">
        <div className="gx-login-content">

          <div className="gx-login-header">
            <img src={require("assets/images/logo-white.png")} alt="wieldy" title="wieldy"/>
          </div>
          <div className="gx-mb-2">
            <h2><IntlMessages id="activation.title"/></h2>
            
          </div>
          {connError &&
            <div> 
              <Alert message={this.props.intl.formatMessage(messages.activationConnectionError)} type="error"  className="gx-mb-3"/>

              <Button type="primary" onClick={this.reload}>
                  <IntlMessages id="activation.tryAgain"/>
              </Button>
            </div>
          }
          {loading &&
            <div className="gx-loader-view">
              <Spin/>
            </div>
          }
          {activated_before &&
            <div> 
              <Alert message={this.props.intl.formatMessage(messages.activationWarningAccountActivatedBefore)} type="warning"  className="gx-mb-3"/>

              <Button type="primary" onClick={this.enterApp}>
                  <IntlMessages id="app.userAuth.login"/>
              </Button>
            </div>
          }
          {success &&
            <div> 
              <Alert message={this.props.intl.formatMessage(messages.activationSuccess)} type="success"  className="gx-mb-3"/>
              <p className ="gx-mb-1"> <Icon type="user" className="gx-mr-1 gx-text-light"/>{name} </p>
              <p> <Icon type="mail" className="gx-mr-1 gx-text-light"/>{email} </p>

              <Button type="primary" onClick={this.enterApp}>
                  <IntlMessages id="activation.goToApp"/>
              </Button>
            </div>
          }

          {error &&

            <div>
             
              { successMail ?
              <Alert className="gx-mb-2"
                message={this.props.intl.formatMessage(messages.activationEmailSent)}
                description={this.props.intl.formatMessage(messages.activationEmailSentDescription)}
                type="success"
                showIcon
              /> 
             
              :             
              <Alert style={{backgroundColor: "#ded1d1"}} className="gx-mb-2"
                message={this.props.intl.formatMessage(messages.activationError)}
                description={this.props.intl.formatMessage(messages.activationErrorDescription)}
                type="error"
                showIcon
              />
              }
              <Form layout="vertical" onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0 gx-mt-4">
                <FormItem label={this.props.intl.formatMessage(messages.activationInputEmail)} >
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: <IntlMessages id="app.form.error.invalidEmail"/>,
                    }],
                  })(
                    <Input type="email" 
                    placeholder={this.props.intl.formatMessage(messages.appFormEmail)}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                  )}
                </FormItem>


                <FormItem>
                  <Button type="primary" htmlType="submit">
                    <IntlMessages id="activation.send"/>
                  </Button>
                </FormItem>
              </Form>
            </div>
          }
    
          

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const { authUser} = auth;

  return {authUser};
};

const WrappedFormActivateEmail = Form.create()(ActivateUser);

export default injectIntl(connect(mapStateToProps)(WrappedFormActivateEmail));


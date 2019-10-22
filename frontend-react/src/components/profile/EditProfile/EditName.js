import React from "react";
import {Button, Form, Icon, Input, Card} from "antd";
//import { connect } from 'react-redux';
//import {Link} from "react-router-dom";

//const { Meta } = Card;

const FormItem = Form.Item;

class EditName extends React.Component {

  state = {
    loading: false,
    editing: false,
  };

  isEditing =() => {
  if(this.state.editing) {return <Button className="gx-mb-0 gx-mt-0"  type="primary" onClick={this.handleOk}> Zapisz </Button> }
    else return <Button className="gx-mb-0 gx-mt-0"  type="link" icon="edit" onClick={this.handleEdit}> Edytuj </Button>
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({loading: true});
       // this.props.dispatch(updateProfile(this.props.profile._id, values));
        this.props.updateProfileData(values);
        this.setState({loading: false, editing: false});
      }
    });

  };

  handleEdit = () => {
    this.setState({editing: true});
  };



  render() {
    const {editing} = this.state;
    const {getFieldDecorator} = this.props.form;
    const name = this.props.username;

console.log("NAME", name)
    return (
        <div>
          <Card type="inner" title="Imię i nazwisko" size="small" 
            extra={this.isEditing()}
            style={{ width: '100% '}}>
            
            { !editing? 
            <p className="gx-mb-1">{name}</p> :
          
            <Form  className="gx-login-form gx-form-row0">
              <FormItem >
                {getFieldDecorator('name', {initialValue: name,
                  rules: [{required: true, message: 'Please input your name!'}],
                })(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder="Name" />
                )}
              </FormItem>
            </Form>
            }

          </Card>
        </div>
    );
  }
}


const EditNameForm = Form.create()(EditName);
export default EditNameForm;
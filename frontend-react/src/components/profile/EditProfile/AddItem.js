import React from "react";
import {Button, Form, Icon, Input} from "antd";
//import { connect } from 'react-redux';
//import {Link} from "react-router-dom";

//const { Meta } = Card;

const FormItem = Form.Item;

class AddItem extends React.Component {

  state = {
    loading: false,
    editing: false,
  };

  isEditing =() => {
  if(this.state.editing) {return <Button className="gx-mb-0 gx-mt-0"  type="primary" > Zapisz </Button> }
    else return <Button className="gx-mb-0 gx-mt-0"  type="link" icon="edit" onClick={this.handleEdit}> Edytuj </Button>
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form ADD: ', values);
        this.setState({loading: true});
       // this.props.dispatch(updateProfile(this.props.profile._id, values));
        this.props.addItem(values);
        this.setState({loading: false, editing: false});
      }
    });

  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  closeEdit = () => {
    this.setState({editing: false});
  };

  render() {
    const {editing} = this.state;
    const {getFieldDecorator} = this.props.form;

console.log("STOP STOP STOP", this.props.type)

    return (
        <div>


        { !editing? 
            <Button icon="plus" type="dashed" onClick={this.handleEdit} >
            Dodaj
          </Button> :
          
            <Form  className="gx-form-row0" style={{display: 'flex', justifyContent: 'space-between', justifyItems: 'center'}}>
              <FormItem style={{justifyContent: 'start'}}>
                {getFieldDecorator('value', {
                  rules: [{required: true, message: 'Wpisz'}],
                })(
                  <Input prefix={<Icon type={this.props.icon} style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder={this.props.type} onPressEnter={this.handleOk}/>
                )}
              </FormItem>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <FormItem >
                  <Button size="small" icon="save" type="primary" onClick={this.handleOk} >
                    Zapisz
                  </Button>
                </FormItem>

                <FormItem >
                  <Button size="small" icon="delete" type="dashed" onClick={this.closeEdit} >
                  </Button>                
                </FormItem>
</div>              
            </Form>
            }

          
        </div>
    );
  }
}



const AddItemForm = Form.create()(AddItem);
export default AddItemForm;
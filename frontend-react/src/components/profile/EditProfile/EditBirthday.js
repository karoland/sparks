import React from "react";
import {Button, Form, Card, DatePicker} from "antd";
import { connect } from 'react-redux';
//import {Link} from "react-router-dom";

import {
  updateProfile,
} from "appRedux/actions/Profile";


//import plPL from 'antd/lib/locale-provider/pl_PL';
import moment from 'moment';
import plPL from 'antd/es/locale-provider/pl_PL';

//import 'moment/locale/pl-PL';
//moment.locale('pl-PL');
//const { Meta } = Card;

const FormItem = Form.Item;
//const moment = require('moment');
//moment.locale("pl");



//      <FormItem label="Birthday">
//                <DatePicker defaultValue={moment(`${profile.birthday}`, dateFormat)} format={dateFormat} />
  //            </FormItem> 

class EditBirthday extends React.Component {

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
        console.log('Received values of form BIRTHDAY: ', values);
        this.setState({loading: true});
//        if(values.birthday === null) 
//        {
//          this.props.dispatch(updateProfile(this.props.profile._id, {birthday: ""})); 
//        }
        this.props.dispatch(updateProfile(this.props.profile._id, values, null)); 
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
    const {profile} = this.props;
//const dateFormat = 'YYYY/MM/DD';
let initialBirthday = (!profile.birthday || profile.birthday === null)? null : moment(profile.birthday)
    console.log("BIRTHDAY", initialBirthday)


    return (
        <div>
          <Card type="inner" title="Dzień urodzenia" size="small" 
            extra={this.isEditing()} 
            style={{ width: '100% '}}>
            
            { !editing ? 

              (profile.birthday===null ? 
                <p className="gx-mb-0 gx-text-light-grey">Brak danych</p> 
                : 
                <p className="gx-mb-1">{`${moment(new Date(profile.birthday)).locale("pl").format('DD MMMM YYYY')}`}</p>     
              )
             :
          
            <Form  onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
              <FormItem >
                {getFieldDecorator('birthday', {initialValue: initialBirthday} ) (<DatePicker format="DD MM YYYY" locale={plPL} className="gx-w-100" />)}
              </FormItem> 
            </Form>

            }

          </Card>
        </div>
    );
  }
}

const mapStateToProps = ({profile}) => {
  const { profileData} = profile;

  return {profileData};
};

const EditBirthdayForm = Form.create()(EditBirthday);
export default connect(mapStateToProps)(EditBirthdayForm);
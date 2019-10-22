import React from "react";
import {Button, Modal} from "antd";
import { connect } from 'react-redux';
//import {Link} from "react-router-dom";
//import { DatePicker } from 'antd';
import EditName from './EditName';
import EditBirthday from './EditBirthday';
import EditList from './EditList';
//import CustomScrollbars from "util/CustomScrollbars";
//import {Scrollbars} from "react-custom-scrollbars";

import {
  updateProfile,
} from "appRedux/actions/Profile";


class EditProfile extends React.Component {

  state = {
    loading: false,
    visible: false,
  };

  showModal = () => { this.setState({ visible: true }); };

  handleOk = () => {
        this.setState({loading: false, visible: false});

  };

  updateProfileData = (values) => {
        console.log('Received values of form: ', values);
        this.setState({loading: true});
        this.props.dispatch(updateProfile(this.props.profile._id, values, this.props.authUser));
        this.setState({loading: false});

  };

  removeItem = (k, type) => {
    console.log('Item to remove: ', k);
    if(type==="Place") {
      let newArray = this.props.profile.places;
      let index = newArray.indexOf(k);

      if (index !== -1) {
        newArray.splice(index, 1);
        this.updateProfileData({'places': newArray})
      }
    }
    if(type==="School") {
      let newArray = this.props.profile.schools;
      let index = newArray.indexOf(k);

      if (index !== -1) {
        newArray.splice(index, 1);
        this.updateProfileData({'schools': newArray})
      }
    }
    if(type==="Work") {
      let newArray = this.props.profile.works;
      let index = newArray.indexOf(k);

      if (index !== -1) {
        newArray.splice(index, 1);
        this.updateProfileData({'works': newArray})
      }
    }
  }

  addItem = (k, type) => {
    console.log('Item to add: ', k, "type", type);
    if(type==="Place") {
      let newArray = this.props.profile.places;
      newArray.push(k);
      this.updateProfileData({'places': newArray})
      console.log('New array of Items: ', newArray);  
    } 
    if(type==="School") {
      let newArray = this.props.profile.schools;
      newArray.push(k);
      this.updateProfileData({'schools': newArray})
      console.log('New array of Items: ', newArray);  
    }
    if(type==="Work") {
      let newArray = this.props.profile.works;
      newArray.push(k);
      this.updateProfileData({'works': newArray})
      console.log('New array of Items: ', newArray);  
    } 
  }

  handleCancel = () => {
    this.setState({visible: false});
  };


  render() {
    const {visible} = this.state;
    const {profile} = this.props;
console.log("EDIT PROFILE auth", this.props.authUser)
    return (
        <div>
            <Button type="link" className="gx-mb-0 gx-mt-0" onClick={this.showModal}> Edytuj dane profilu </Button>
            <Modal
              visible={visible}
              title="Edycja danych profilu"
              onOk={this.handleOk}
              onCancel={this.handleCancel}

              footer={[
                <Button key="back" onClick={this.handleCancel}>Zakończ edycję</Button>,
              ]}
            >

            <EditName username={profile.name} updateProfileData={this.updateProfileData.bind(this)} />
            <EditBirthday profile={this.props.profile}  />
            <EditList
              removeItem={this.removeItem.bind(this)} 
              addItem={this.addItem.bind(this)} 
              updateProfileData={this.updateProfileData.bind(this)} 
              data={this.props.profile.places}
              title={"Miejsca zamieszkania"}
              type={"Place"}
              icon={"home"}
            />
            <EditList
              removeItem={this.removeItem.bind(this)} 
              addItem={this.addItem.bind(this)} 
              updateProfileData={this.updateProfileData.bind(this)} 
              data={this.props.profile.schools}
              title={"Szkoły"}
              type={"School"}
              icon={"read"}
            />
            <EditList
              removeItem={this.removeItem.bind(this)} 
              addItem={this.addItem.bind(this)} 
              updateProfileData={this.updateProfileData.bind(this)} 
              data={this.props.profile.works}
              title={"Miejsca pracy"}
              type={"Work"}
              icon={"bank"}
            />

            </Modal>
        </div>
    );
  }
}

const mapStateToProps = ({profile, auth}) => {
  const { profileData} = profile;
  const {authUser} = auth;
  return {profileData, authUser};
};

export default connect(mapStateToProps)(EditProfile);
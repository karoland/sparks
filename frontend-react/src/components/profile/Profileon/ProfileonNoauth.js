import React from "react";
import { Card, Button, Avatar } from "antd";
import Widget from "components/Widget";
import axios from 'util/Api'


class Profileon extends React.Component {

  state = {
    isFollow: false,
    avatar: ''
  }

  handleToggle = () => {
    this.setState((previousState) => ({
      isFollow: !previousState.isFollow
    }));
  }


  render() {
    const {places, schools, works, birthday} = this.props.profile;


    return (

      
      <Card className="gx-card gx-profileon-bg" 
            actions={[<Button size="large" icon={this.state.isFollow === true ? 'eye' : 'eye-invisible'}
                  onClick={this.handleToggle}>{this.state.isFollow === true ? 'Follow' : 'Unfollow'}</Button>, 
                  <Button size="large" type="primary" icon="mail">Message</Button>]}>
        <p className="gx-h1-lg" style={{ color: '#ffffff' }}> {this.props.profile.name}</p> 

        <div className="gx-profileon">
          <div >
            { this.props.profile.avatar ? 
              <img src={this.props.profile.avatar.url } alt='avatar' className="gx-profileon-thumb"/> : <Avatar size={150} icon="user" />
              
            }
          </div>
        </div>

      </Card> 


      
    );
  }
}


export default Profileon;
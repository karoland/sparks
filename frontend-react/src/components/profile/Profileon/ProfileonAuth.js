import React from "react";
import { Card, Button, Avatar } from "antd";
import Widget from "components/Widget";
import EditProfile from "components/profile/EditProfile";
import About from 'components/profile/About';
//import EditPhoto from './EditPhoto';
import axios from 'util/Api'



class Profileon extends React.Component {

state = {
  avatar: ''
}


  render() {
    const {places, schools, works, birthday} = this.props.profile;
    const id = this.props.profile._id;

    return (

<div>
      <Card className="gx-profileon-bg gx-mb-0" >
        
        <p className="gx-h1-lg" style={{ color: '#ffffff' }}> {this.props.profile.name}</p>

        <div className="gx-profileon gx-profileon-bg gx-mb-0" style={{position: 'relative'}}>
          <div className="gx-profileon-thumb ">
            
            { this.props.profile.avatar ? 
              <img src={this.props.profile.avatar.url } alt='avatar'/> : null
              
            }
            
           {/* <EditPhoto profile={this.props.profile}/> */}
          </div>
        </div>        

      </Card>

      <Card className="gx-card-profile-sm" 
        actions={[<EditProfile profile={this.props.profile}/>]}
      >
      <About
          places={places}
          schools={schools}
          works={works}
          birthday={birthday}

        />
        </Card>
        

     </div> 
    

    );
  }
}


export default Profileon;
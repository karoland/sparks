import React from "react";
import {Avatar, Button} from "antd";
import MessageWidget from "components/Widgets/MessageWidget";
import EditPhoto from './EditPhoto';
import { isAuthenticated } from "containers/auth/index";

const moment = require('moment');


const ProfileHeader = (props) => {

  const {name, avatar,places, birthday} = props.profile;
//  console.log("isAuth", props.isAuthorized)
//  console.log("Checking followersa", props.following)
  let placesLength = places.length;

  return (

    <div className="gx-profile-banner2" >

        <div className="gx-profile-banner2-top">

          <div className="gx-profile-banner2-top-left">
            <div className="gx-profile-banner-avatar ">
              <div className="container-image">
                {avatar ? 
                <Avatar className="gx-size-200" shape="square"  alt="..." src={avatar.url}/> :
                <Avatar className="gx-size-200" size={100} shape="square" icon="user"/>
                }
                { props.isAuthorized &&
                  <EditPhoto profile={props.profile}/>
                }
                
              </div>
            </div>
            <div className="gx-profile-banner2-avatar-info">
              <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">{name}</h2>

              <div className="gx-mb-2">
                {places.length>0 &&  
                  places.map((place, index) => (
                    <span className="gx-fs-lg" key={index} > {place} 
                      { index < (placesLength-1) && <span className="gx-d-inline-block gx-toolbar-separator gx-mr-1 gx-ml-1">&nbsp;</span>}
                    </span> 
                  ))        
                }
              </div>
              { birthday &&
              <p className="gx-mb-0 gx-fs-lg"> Wiek: {`${moment().diff(birthday, 'years')}`} </p>
              }

            </div>
          </div>
          <div className="gx-profile-banner2-top-right" style={{width:"300px"}}>
          { props.isAuthorized ? 
            <Button style={{width: "100%"}} onClick={()=>props.history.push(`/user/${props.profile._id}/about`)}> Dane profilu </Button>
            :
            <div>
            {props.following ?
              <Button style={{width: "100%"}} onClick={props.unfollow}> Przestań obserwować</Button>

              :
              <Button style={{width: "100%"}} onClick={props.follow}> Obserwuj</Button>
            }
            </div>
          }
          { (props.profile._id === isAuthenticated()._id) ?
            <MessageWidget reciever={undefined}/>            
            :
            <MessageWidget reciever={props.profile}/>
          }


          </div>
    
        </div>
 
 
  </div>



  
  )
}

export default ProfileHeader;

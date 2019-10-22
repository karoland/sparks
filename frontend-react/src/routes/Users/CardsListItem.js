import React from "react";
//import {Button} from "antd";
import { Avatar, Card } from 'antd';
import { Link } from "react-router-dom";
import Bg from "assets/images/rect_grey.png"
const { Meta } = Card;
const moment = require('moment');


function CardsListItem({styleName, data}) {

  const {name, avatar, places, birthday, _id} = data;
  let placesLength = places.length;
    
  return (
    <Card  className="gx-mb-0"
    
    style={{ height: "auto"}}
    actions={[
      <Link to={`/user/${_id}`} >Zobacz profil </Link> ,
    ]}
    cover=
    {avatar ? 
        <img alt="cd" src={avatar.url} /> 
        :
        <div className="container-image">
          <img src={Bg} alt="Avatar" style={{width:"100%"}}/>
          <Avatar icon="user" size={100}
                  className="btn gx-avatar gx-bg-grey gx-text-white"> </Avatar>
        </div>
   
      }
    
  >
    <Meta 

        title={
          <Link to={`/user/${_id}`}>
              <h4 className="gx-link">{name}</h4>
          </Link> }
        description={
          <div >
           {/* <i className="icon icon-birthday-new gx-fs-sm gx-text-secondary"/>*/}
            { birthday &&
            <span className="gx-text-grey"> Wiek: {`${moment().diff(birthday, 'years')}`} </span>
            }

            <p className="gx-mt-2 gx-mb-0 gx-pb-0">
              {places.length>0 &&
                places.map((place, index) => (
                  <span key={index} > {place} 
                    { index < (placesLength-1) && <span className="gx-d-inline-block gx-toolbar-separator gx-mr-1 gx-ml-1">&nbsp;</span>}
                  </span> 
                ))          
              }
            </p>
 

          </div>
        }
    />

  </Card>
  );
}

/*<div className="gx-product-item gx-product-horizontal">
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-link gx-grid-thumb-cover">
      {avatar ? 
        <img alt="cd" src={avatar.url} /> 
        : <div className="gx-bg-grey"> <Avatar size={50} icon="user" /> </div> 
      }
        </span>
        </div>
      </div>

      <div className="gx-product-body">

      <div className="gx-description">
        <div className="gx-flex-row">

        <Link to={`/user/${_id}`}>
          <h4 className="gx-link">{name}</h4>
          </Link>
         
        </div>

        <i className="icon icon-birthday-new gx-fs-sm gx-text-secondary"/>
        <span className="gx-text-grey"> 26.01.1985 </span>

        <p className="gx-mt-2">
          {places.length>0 &&
            places.map((place, index) => (
              <span key={index} > {place} 
                { index < (placesLength-1) && <span className="gx-d-inline-block gx-toolbar-separator gx-mr-1 gx-ml-1">&nbsp;</span>}
              </span> 
            ))          
          }
        </p>
      </div>
      <div className="gx-card-list-footer">
        <Button type="primary">Follow</Button>
        <Button>Message</Button>
      </div>
</div>

    </div> */


export default CardsListItem;

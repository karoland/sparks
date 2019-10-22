import React from "react";
import { Row, Col } from "antd";
import Widget from "components/Widget";
import EditProfile from "components/profile/EditProfile";

import 'moment/locale/pl';  // without this line it didn't work

const moment = require('moment');


class About extends React.Component {


  render() {
    return (
     
        <Widget styleName="gx-card-profile"
            extra={
              <div className="gx-pt=0 gx-mt-0">
              { this.props.isAuthorized &&
              <EditProfile profile={this.props.profile} />
              }
              </div>
            }
        title={<span className="gx-pt-0">{this.props.name}</span>} > 

<Row >             

            <Col xl={6} md={12} sm={12} xs={12}>

            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-birthday-new gx-fs-xl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Urodziny</h6>
                {!this.props.birthday ? 
                  <p className="gx-mb-0 gx-text-light-grey">Brak danych</p> : 
                  <p className="gx-mb-0 gx-mt-2" >
                  {`${moment(new Date(
                                this.props.birthday
                            )).locale("pl").format('DD MMMM YYYY')}`}</p>}
              </div>
            </div>
            </Col>
            

            <Col xl={6} md={12} sm={12} xs={12}>
              
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-home gx-fs-xl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Miejsca zamieszkania</h6>
                {this.props.places.length===0 ? 
                  <p className="gx-mb-0 gx-text-light-grey">Brak danych</p> : 
                  this.props.places.map((p, index) => (
                    <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                    ))

                  }
              </div>
            </div>
            </Col>
          

            <Col xl={6} md={12} sm={12} xs={12}>
   
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-graduation gx-fs-xl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Szkoły</h6>
                {this.props.schools.length===0  ? 
                  <p className="gx-mb-0 gx-text-light-grey">Brak danych</p> : 
                  this.props.schools.map((p, index) => (
                      <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                    ))
                }
              </div>
            </div>
          </Col>   

           <Col xl={6} md={12} sm={12} xs={12}>
    
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-company gx-fs-xl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Miejsca pracy</h6>
                {this.props.works.length===0 ? 
                  <p className="gx-mb-0 gx-text-light-grey">Brak danych</p> : 
                  this.props.works.map((p, index) => (
                    <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                  ))
                }
              </div>
            </div>
            </Col>
          </Row>   

        </Widget>   


    );
  }
}


export default About;

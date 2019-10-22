import React from "react";
import { Row, Divider } from "antd";
import Widget from "components/Widget";
import {aboutList} from "routes/Profile/data";
import 'moment/locale/pl';  // without this line it didn't work

const moment = require('moment');


class About2 extends React.Component {


  render() {

    return (

      
        <div className="gx-card-profile-sm" >
          <Row>    
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-birthday-new gx-fs-xlxl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Birthday</h6>
                {!this.props.birthday ? 
                  <p className="gx-mb-0 gx-text-light-grey">No data</p> : 
                  <p className="gx-mb-0 gx-mt-2" >
                  {`${moment(new Date(
                                this.props.birthday
                            )).format('L')}`}</p>}
              </div>
            </div>
          </Row>   

          <Row>    
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-home gx-fs-xlxl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Places</h6>
                {this.props.places.length===0 ? 
                  <p className="gx-mb-0 gx-text-light-grey">No data</p> : 
                  this.props.places.map((p, index) => (
                    <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                    ))

                  }
              </div>
            </div>
          </Row>   

          <Row>    
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-graduation gx-fs-xlxl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Schools</h6>
                {this.props.schools.length===0  ? 
                  <p className="gx-mb-0 gx-text-light-grey">No data</p> : 
                  this.props.schools.map((p, index) => (
                      <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                    ))
                }
              </div>
            </div>
          </Row>   

          <Row>    
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mb-1">
              <div className="gx-mr-3 gx-ml-2">
                <i className="icon icon-company gx-fs-xlxl gx-text-secondary"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Works</h6>
                {this.props.works.length===0 ? 
                  <p className="gx-mb-0 gx-text-light-grey">No data</p> : 
                  this.props.works.map((p, index) => (
                    <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                  ))
                }
              </div>
            </div>
          </Row>   

        </div>          
      

    );
  }
}


export default About2;

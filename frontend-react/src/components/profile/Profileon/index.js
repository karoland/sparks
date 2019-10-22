import React from "react";
import { Card, Button } from "antd";
import Widget from "components/Widget";


class Profileon extends React.Component {

  state = {
    isFollow: false
  }

  handleToggle = () => {
    this.setState((previousState) => ({
      isFollow: !previousState.isFollow
    }));
  }

  render() {
    const {isAuthorized} = this.props;
          console.log("Profileon auth", isAuthorized)

    return (

      isAuthorized ? 

      <Card className="gx-card gx-profileon-bg" 
            actions={[ 
                  <Button size="small" type="primary" icon="edit">Edit profile</Button>]}>
        <p className="gx-h1-lg" style={{ color: '#ffffff' }}> {this.props.name}</p> 

        <div className="gx-profileon">
          <div className="gx-profileon-thumb gx-profileon-thumb-htctrcrop">
            <img src={'https://pracowniazdrowegostylu.pl/wp-content/uploads/2017/11/grace-face-1.jpg'} alt=''/>
          </div>
        </div>

      </Card> 
      
      :
      
      <Card className="gx-card gx-profileon-bg" 
            actions={[<Button size="large" icon={this.state.isFollow === true ? 'eye' : 'eye-invisible'}
                  onClick={this.handleToggle}>{this.state.isFollow === true ? 'Follow' : 'Unfollow'}</Button>, 
                  <Button size="large" type="primary" icon="mail">Message</Button>]}>
        <p className="gx-h1-lg" style={{ color: '#ffffff' }}> {this.props.name}</p> 

        <div className="gx-profileon">
          <div className="gx-profileon-thumb gx-profileon-thumb-htctrcrop">
            <img src={'https://pracowniazdrowegostylu.pl/wp-content/uploads/2017/11/grace-face-1.jpg'} alt=''/>
          </div>
        </div>

      </Card> 


      
    );
  }
}


export default Profileon;
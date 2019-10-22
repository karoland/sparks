import React, {Component} from "react";

class GridImage extends Component {

  handleCancel() {
    this.props.handleToggle();
  }

  render() {
    const {mediaList} = this.props;

      
        return (<div className="gx-gallery-item" onClick={this.handleCancel.bind(this)}>
          <img className="gx-img-fluid" src={mediaList.url} style={{ maxHeight: '300px', width: 'auto'}} alt="post"/>
        </div>
      )
      
    
  }
}

export default GridImage;

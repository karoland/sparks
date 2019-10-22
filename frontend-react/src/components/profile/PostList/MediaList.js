import React, {Component} from "react";
import {Modal} from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GreedImage from "./GridImage";
import Auxiliary from "util/Auxiliary";

class MediaList extends Component {

  state = {
    previewVisible: false,
  }

  handleToggle() {
    this.setState((previousState) => ({
      previewVisible: !previousState.previewVisible,
    }));
  }

  render() {
    return (
      <Auxiliary>
        <GreedImage mediaList={this.props.photo} handleToggle={this.handleToggle.bind(this)}/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleToggle.bind(this)}>
          <Carousel mediaList={this.props.photo}/>
        </Modal>
      </Auxiliary>
    );
  }
}

function Carousel(props) {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides'
  };
  return (
    <Auxiliary>
      <h4>Slide Show</h4>
      <Slider {...settings}>
        {
            <img alt="example" style={{ width: '100%'}} src={this.props.mediaList}/>
          
        
        }
      </Slider>
    </Auxiliary>
  );
}

export default MediaList;

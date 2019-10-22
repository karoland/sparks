import React, {Component} from "react";
import {Avatar, Card, Modal} from "antd";
//import CommentBox from "./CommentBox";
//import MediaList from "./MediaList";
import DisplayDate from "../DisplayDate/index";
import {Link} from "react-router-dom";

//const btoa = require('btoa');
//const moment = require('moment');


class PostItem extends Component {

  state = {
    message: '',
    previewVisible: false,
    user: {},
    post: {
      id: 0,
      text: '',
      user: {},
      date: '',
      mediaList: [],
      likeCount: 0,
      isLike: false,
      commentList: []
    },
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log("user --->", this.state.user)
      const commentData = {
        user: this.state.user,
        comment: this.state.message,
        date: new Date().toString(),
        likeCount: 0,
        isLike: true,
        commentList: []
      }

      let commentArray = this.state.post.commentList;
      commentArray.push(commentData);
      this.setState((previousState) => ({
        post: {
          ...previousState.post,
          commentList: commentArray
        }, message: ''
      }));
    }
  }

  componentWillMount() {
    this.setState({post: this.props.postData, user: this.props.user})
  }

  updateCommentValue(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  handleLikeToggle() {
    this.setState((previousState) => ({
      post: {
        ...previousState.post,
        isLike: !previousState.post.isLike,
        likeCount: (previousState.post.isLike === true ? previousState.post.likeCount - 1 : previousState.post.likeCount + 1)
      }
    }));
  }

  handleCancel = () => {this.setState({ previewVisible: false }) }

  handlePreview = () => {this.setState({ previewVisible: true }) }


  render() {
    const {postData, participants, text, photo} = this.props;
    const author = participants.find(obj => obj.part === "Author").user;
    const reciever = participants.find(obj => obj.part === "Reciever");
//    console.log("Photo", postData)
 //   const displayText=text.replace(/\r?\n/g, '<br>');

    return (
      <Card className="gx-card">
        <div className="gx-wall-content">


        <div className="gx-media gx-flex-nowrap gx-wall-user-info gx-mb-0">
          {(author && author.avatar) ? 
            <Avatar className="gx-mr-3 " size={48} src={author.avatar.url}/> :
            <Avatar size={48} icon="user" className="gx-mr-3 "/> 
          }
          
          <div className="gx-media-body">
            <Link to={`/user/${author._id}`} className="gx-wall-user-title gx-font-weight-medium"> <span className="gx-link">{author.name}</span>  </Link>
            {reciever && reciever.delivery==="Email" &&
              <span>do <span className="gx-font-weight-medium"> {reciever.named} </span></span>
            }
            {reciever && reciever.delivery==="User" &&
              <span>do 
              <Link to={`/user/${reciever.user._id}`} className="gx-wall-user-title gx-font-weight-medium"> <span className="gx-link">{reciever.user.name}</span>  </Link>

              </span>

            }
            <DisplayDate date={postData}/>
            
            <p className="gx-mt-2" style={{whiteSpace: "pre-line"}}>{text}</p>

            
            {photo && 
              <div className="gx-wall-medialist">
                <div className="gx-gallery-item" onClick={this.handlePreview.bind(this)}>
                  <img className="gx-img-fluid" src={photo.url} style={{ maxHeight: '160px', width: 'auto'}} alt="post"/>
                </div> 

                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={photo.url} />
                </Modal>

              </div>
          }


           {/* <div className="gx-flex-row gx-mb-2 gx-mb-xl-3">            
              <p className="gx-fs-sm gx-pointer gx-mr-3 gx-text-grey" onClick={this.handleLikeToggle.bind(this)}>
                {isLike === true ?
                  <i className="icon icon-like gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle"
                     style={{color: 'blue'}}/> :
                  <i className="icon icon-like-o gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle"/>}
                <span
                  className="gx-d-inline-flex gx-vertical-align-middle">{likeCount > 0 ? likeCount + ' Likes' : 'Likes'}</span>
              </p>

              <p className="gx-fs-sm gx-pointer gx-mr-3 gx-text-grey">
                <i className="icon icon-chat-bubble gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle"/>
                <span
                  className="gx-d-inline-flex gx-vertical-align-middle">{commentList.length > 0 ? commentList.length + ' Comments' : 'Comments'}</span>
              </p>
            </div>*/}
      
            {/*<div className="">
              {commentList.map((commentData, index) => <CommentBox key={index} index={index} commentData={commentData}/>)}
            </div>*/}

            {/*<div className="" >
              <div className="gx-media gx-mb-2">
                <Avatar className="gx-mr-3 gx-size-36" src={user.image}/>
                <div className="gx-media-body">
                  <textarea
                    id="required" className="ant-input" rows={1}
                    onChange={(event) => this.updateCommentValue(event)}
                    onKeyPress={(event) => this._handleKeyPress(event)}
                    value={this.state.message}
                    placeholder="Type Comments"
                  />
                </div>
              </div>
            </div>*/}

            
          </div>


        </div>
      
      </div>
      </Card>
    )
  }
}

export default PostItem;

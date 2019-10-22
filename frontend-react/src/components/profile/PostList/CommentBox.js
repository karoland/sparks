import React, {Component} from "react";
import {Link} from "react-router-dom";

import {Avatar} from "antd";

import DisplayDate from "../DisplayDate/index";

class CommentBox extends Component {

  state = {
    isComment: false,
    commentData: {
      id: 0,
      user: {},
      date: '',
      commentList: [],
      comment: ''
    },
  };
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCommentToggle();
    }
  }

  componentWillMount() {
    this.setState({commentData: this.props.commentData})
  }


  handleCommentToggle() {
    this.setState((previousState) => ({
        isComment: !previousState.isComment,
      }
    ));
  }

  render() {
    const {user, date, comment} = this.state.commentData;
    return (
      <div className="gx-media gx-flex-nowrap gx-wall-user-info gx-mb-1">
        <Avatar className="gx-mr-3 gx-size-36" src={user.image}/>
        <div className="gx-media-body">
 
          <div style={{ display: 'inline-flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'}}>
            <Link to="" className="gx-link gx-font-weight-medium gx-mr-2"> <span className="gx-link">{user.name}</span>  </Link>
            <DisplayDate date={date}/>
          </div>
          <p className="gx-mt-1">{comment}</p>
          
          {this.state.isComment === true ? <div className="gx-media">
            <Avatar className="gx-mr-3 gx-size-30" src={user.image}/>
            <div className="gx-media-body">
              <input
                id="required" className="gx-border-0 ant-input"
                placeholder="Type Comments"
                onKeyPress={(event) => this._handleKeyPress(event)}
              />
            </div>
          </div> : null}

        </div>
      </div>
    )
  }
}

export default CommentBox;

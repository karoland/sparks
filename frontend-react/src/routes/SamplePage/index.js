import React from "react";
import {connect} from "react-redux";

import {  getFriendsPosts, createPost} from "appRedux/actions/Profile";
import {  getAllMessages, } from "appRedux/actions/Message";
import WriteBox from "components/profile/WriteBox/index";

import Auxiliary from "util/Auxiliary";
import {Col, Row} from "antd";
import PostItem from "components/profile/PostList/PostItem.js";
import NewPhotos from "components/Widgets/NewPhotos";
import WidgetProfile from "components/Widgets/WidgetProfile";
import NewPhotosSmall from "components/Widgets/NewPhotosSmall";
import WidgetProfileSmall from "components/Widgets/WidgetProfileSmall";
import Breakpoint from 'react-socks';


class SamplePage extends React.Component {

  state={
    newMails: undefined,
  }
	componentDidMount(){
      this.props.dispatch(getFriendsPosts(this.props.authUser._id));
      this.props.dispatch(getAllMessages(this.props.authUser._id));
    }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    
    if (nextProps.messages !== this.props.messages) {
      const userId= this.props.authUser._id;
//    console.log("Dodartłam tu, zmieniam folder", userId, "selectedFolder", this.state.selectedFolder, "nextprops", nextProps.messages)

      let mails = nextProps.messages.filter(mail => {
        return (mail.to.folder === "Inbox" && mail.to.user && mail.to.user._id===userId && !mail.to.isOpened)
      })
      this.setState({
        newMails: mails.length
      })
    }
  }


  addPost(text, reciever, image) {
  console.log("Adding post", image)


      const post = {
  //      id: Math.random() * 1343300,
        body: text,
        participants : (reciever!==undefined ? 
          {
          delivery: reciever.reciever.delivery,
          address: reciever.reciever.address,
          part: "Reciever",
          named: reciever.reciever.named,
          publicates: reciever.reciever.publicates,
          user: reciever.reciever.user,
          } :
          undefined 
          ),
        photo: (image!==undefined ? 
          {
          public_id: image.public_id,
          url: image.url,
          } :
          undefined 
          )
        
      }
      console.log("Post Data :==()==>", post)

      this.props.dispatch(createPost(post, this.props.friendsPosts, "friendsPosts"));
    }

  render() {
    const {friendsPosts} = this.props;

    console.log("Authuser", this.props.authUser);
      return (
        <Auxiliary>
          <div className="gx-main-content">

            <Breakpoint small down>
              <Row>
                <Col sm={12} xs={12}>
                  <WidgetProfileSmall user={this.props.authUser} gotoProfile={() => {this.props.history.push(`/user/${this.props.authUser._id}`)}}/>
                </Col>
                <Col sm={12} xs={12}>
                  <NewPhotosSmall newMails={this.state.newMails} gotoMessages={() => {this.props.history.push(`/user/${this.props.authUser._id}/mail`)}}/>
                </Col>

                <Col sm={24} xs={24}>
                  <h2 className="title gx-mb-4">Publiczne wpisy Twoje i Twoich znajomych</h2>
                  <div>
                  <WriteBox addPost={this.addPost.bind(this)} authUser={this.props.authUser} user={this.props.authUser}/>

                  { friendsPosts &&
                    friendsPosts.map((post) => {
                      return <PostItem key={post._id} index={post._id} text={post.body} postData={post.created} participants={post.participants} photo={post.photo}/>
                    })
                  }
                  { friendsPosts && friendsPosts.length===0 &&
                    <div className="gx-no-content-found gx-text-light gx-text-center">
                      <p> Obserwowani przez Ciebie znajomi nie mają jeszcze wpisów </p>
                      <p>  Napisz pierwszą serdeczną iskierkę. </p>
                    </div>
                  }
                  </div>
                </Col>

                
              </Row>            
            </Breakpoint>

            <Breakpoint medium up>

              <Row>
                <Col xl={17} lg={14} md={14} sm={24} xs={24}>
                  <h2 className="title gx-mb-4">Publiczne wpisy Twoje i Twoich znajomych</h2>
                  <div>
                  <WriteBox addPost={this.addPost.bind(this)} authUser={this.props.authUser} user={this.props.authUser}/>

                  { friendsPosts &&
                    friendsPosts.map((post) => {
                      return <PostItem key={post._id} index={post._id} text={post.body} postData={post.created} participants={post.participants} photo={post.photo}/>
                    })
                  }
                  { friendsPosts && friendsPosts.length===0 &&
                    <div className="gx-no-content-found gx-text-light gx-text-center">
                      <p> Obserwowani przez Ciebie znajomi nie mają jeszcze wpisów </p>
                      <p>  Napisz pierwszą serdeczną iskierkę. </p>
                    </div>
                  }
                  </div>
                </Col>
                <Col  xl={7} lg={10} md={10} sm={24} xs={24}>
                  <WidgetProfile user={this.props.authUser} gotoProfile={() => {this.props.history.push(`/user/${this.props.authUser._id}`)}}/>
                  <NewPhotos newMails={this.state.newMails} gotoMessages={() => {this.props.history.push(`/user/${this.props.authUser._id}/mail`)}}/>
                  <div className="gx-d-flex justify-content-center">
                    <h4>Start building your app. Happy Coding!</h4>
                  </div>
                </Col>
            </Row>
          </Breakpoint>
            

        </div>
        </Auxiliary>

      );
    };
  }

const mapStateToProps = ({profile, auth, message}) => {
  const {friendsPosts} = profile;
  const {authUser} = auth;
  const {messages} = message

  return {friendsPosts, authUser, messages}
}

export default connect(mapStateToProps)(SamplePage);


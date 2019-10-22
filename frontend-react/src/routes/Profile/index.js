import React, {Component} from "react";
import {Link} from "react-router-dom";


import {Col, Row} from "antd";
import { connect } from 'react-redux';
import CardsListItem from "routes/Users//CardsListItem";

import {
  readProfile,
  follow,
  unfollow,

} from "appRedux/actions/Profile";

//import Friends from "components/profile/Friends/index";
import Auxiliary from "util/Auxiliary";
//import ProfileonAuth from "components/profile/Profileon/ProfileonAuth";
//import ProfileonNoauth from "components/profile/Profileon/ProfileonNoauth";

import PostList from "components/profile/PostList/index";
import {user} from "routes/Wall/data";
import { Menu} from 'antd';

import { isAuthorized, isAuthenticated } from "containers/auth/index";
import ProfileHeader from "components/profile/ProfileHeader/index";
import About from "components/profile/About"
//import Submenu from "routes/Profile/Submenu";
//import asyncComponent from "util/asyncComponent";
//import axios from 'util/Api'
import SparkWidget from "components/Widgets/SparkWidget";


class Profile extends Component {

  state = {
    following: false,
    cheched_following: false,
  }

  // fetchingData 
  componentDidMount() {
      const userId = this.props.match.params.userId;      
      this.props.dispatch(readProfile(userId, isAuthenticated()._id));

// if ERROR redirect to Signin
  }


  follow = () => {
    const userId=isAuthenticated()._id;
    const followId=this.props.match.params.userId;
//    const token = JSON.parse(localStorage.getItem("token"));
    console.log("json strin", JSON.stringify({ userId, followId }))

    this.props.dispatch(follow(userId, followId));
}

  unfollow = () => {
    const userId=isAuthenticated()._id;
    const followId=this.props.match.params.userId;
 //   const token = JSON.parse(localStorage.getItem("token"));
    //console.log("json strin", JSON.stringify({ userId, followId }))

    this.props.dispatch(unfollow(userId, followId));
}

    checkFollow = () => {
        const jwt = isAuthenticated();
          console.log("Followers checkich", this.props.profileData.followers, "jwtid", jwt)

        if(this.props.profileData.followers) {
          console.log("Followers", user.followers)
        const match = this.props.profileData.followers.find(follower => {
            // one id has many other ids (followers) and vice versa
            return follower._id === jwt._id;
        });
        return match
//        this.setState({following: match, cheched_following:true})
      }
     // else this.setState({Followwing:false, cheched_following:true});
     if(!this.props.profileData.followers) {return false;}
     
    }

  render() {
    const { profileData, match } = this.props;    
    //const path=`${match.url}/sparks`
    console.log("EDIT PROFILE profile", this.props.authUser)

    const userId = this.props.match.params.userId;

//    if(!this.state.cheched_following) this.checkFollow(this.props.match.params.userId)

    let selectedKeys = ""
    if(match.path==="/user/:userId") selectedKeys="sparks"
    if(match.path==="/user/:userId/sparks") selectedKeys="sparks"
    if(match.path==="/user/:userId/about") selectedKeys="about"
    if(match.path==="/user/:userId/following") selectedKeys="following"
    if(match.path==="/user/:userId/followers") selectedKeys="followers"


console.log("Match in profile", profileData)
  //  console.log("isAuthorized", this.state.isAuthorized);


    return (
      <Auxiliary>
        <div className="gx-main-content">


{/*        <Breakpoint small down>
          <div>I will render only in mobile devices</div>
        </Breakpoint>

        <Breakpoint medium up> */}
        { profileData &&
          <div>
          { this.checkFollow() ?
            <ProfileHeader isAuthorized={isAuthorized(userId)} following={true} follow={this.follow.bind(this)} unfollow={this.unfollow.bind(this)} profile={profileData} history={this.props.history} location={this.props.location}/>
            :
            <ProfileHeader isAuthorized={isAuthorized(userId)} following={false} follow={this.follow.bind(this)} unfollow={this.unfollow.bind(this)} profile={profileData} history={this.props.history} location={this.props.location}/>              

          }
          </div>
        }
        { profileData && 
          <Menu className="gx-mb-2 gx-mt-2"
       // defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            mode="horizontal">
   
            <Menu.Item className="gx-mr-1 gx-bg-white" key="sparks">
              <Link to={`/user/${profileData._id}/sparks`} >
                <span className="gx-font-weight-medium  gx-text-uppercase gx-fs-sm"> Iskierki </span> 
              </Link>
            </Menu.Item>

            <Menu.Item className="gx-mr-1 gx-bg-white" key="about">
              <Link to={`/user/${profileData._id}/about`}> 
                <span className="gx-font-weight-medium  gx-text-uppercase gx-fs-sm "> Informacje </span> 
              </Link>
            </Menu.Item>

            <Menu.Item className="gx-mr-1 gx-bg-white" key="following">
              <Link to={`/user/${profileData._id}/following`}> 
                <span className="gx-font-weight-medium  gx-text-uppercase gx-fs-sm "> Obserwowani </span> 
                <span className="gx-fs-sm gx-text-dark"> {`(${profileData.following.length})`} </span>
              </Link>
            </Menu.Item>

            <Menu.Item className="gx-mr-1 gx-bg-white" key="followers">
              <Link to={`/user/${profileData._id}/followers`}> 
                <span className="gx-font-weight-medium  gx-text-uppercase gx-fs-sm"> Obserwujący </span> 
                <span className="gx-fs-sm gx-text-dark"> {`(${profileData.followers.length})`} </span>
              </Link>
            </Menu.Item>

          </Menu> }

          <Row>

          <Col xl={17} lg={14} md={14} sm={24} xs={24}>

          {match.path === "/user/:userId" && 
            <div className="gx-wall-postlist">
                  {profileData &&
                    <PostList user={profileData} match={this.props.match} isAuthorized={isAuthorized(userId)}/>
                  }
                  </div>
          }

          {match.path === "/user/:userId/sparks" && 
            <div className="gx-wall-postlist" >
                  {profileData &&
                    <PostList user={profileData} match={this.props.match}/>
                  }
                  </div>
          }
          {match.path === "/user/:userId/about" && 
            <div>
            { profileData &&
              <About
                name={profileData.name}
                places={profileData.places}
                schools={profileData.schools}
                works={profileData.works}
                birthday={profileData.birthday}
                isAuthorized={isAuthorized(userId)}
                profile={profileData}
              />
            }
            </div>
          }
          {match.path === "/user/:userId/following" && 
            <div className="gx-mt-3">
              {(profileData && profileData.following.length>0) ?
                  <Row>
                    {profileData.following.map((data, index) => (<Col  className="gx-mb-4" key={index} xl={8} md={12} sm={12} xs={12}>
                      <CardsListItem key={index} data={data}/>
                      </Col>
                    ))}
                  </Row>
                :

                <p className="gx-no-content-found gx-text-light gx-text-center"> Brak obserwowanych znajomych</p>
              }
                  
            </div>
          }
          {match.path === "/user/:userId/followers" && 
            <div className="gx-mt-3">
              {(profileData && profileData.followers.length>0) ?
                <Row>
                    {profileData.followers.map((data, index) => (<Col  className="gx-mb-4" key={index} xl={8} md={12} sm={12} xs={12}>
                      <CardsListItem key={index} data={data}/>
                      </Col>
                    ))}
                  </Row>
                :
                <p className="gx-no-content-found gx-text-light gx-text-center"> Brak obserwujących znajomych</p>
              }
                  
            </div>
          }


{/*
              <Tabs defaultActiveKey="1" size="large" id="subTabs" ref="subTabs">
                <TabPane tab="Wall" key="1" id="subTabs1" ref="subTabs1">
                  <div className="gx-wall-postlist">
                  {profileData &&
                    <PostList user={profileData} match={this.props.match}/>
                  }
                  </div>
                </TabPane>
                <TabPane tab="Following" key="2" id="subTabs2" ref="subTabs2">
                  
                  Followwing
                </TabPane>
                <TabPane tab="Followers" key="3">
                  Followers  
                </TabPane>
              </Tabs> 
*/}
            </Col>

            <Col  xl={7} lg={10} md={10} sm={24} xs={24}>
            {/* profileData &&  
              <div>
                {this.state.isAuthorized ? 
                <ProfileonAuth profile={profileData} />
                : <ProfileonNoauth profile={profileData} />  }

              </div>

            */}
              <SparkWidget isAuthorized={isAuthorized(userId)}/>
            </Col>

            

          </Row>      
        {/*  </Breakpoint> */}

        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({profile, commonData}) => {
  const { profileData} = profile;
  const { loading} = commonData;


  return {profileData, loading};
};

export default connect(mapStateToProps)(Profile)

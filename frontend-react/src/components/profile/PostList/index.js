import React, {Component} from "react";
import PostItem from "./PostItem";
import WriteBox from "components/profile/WriteBox/index";
import Auxiliary from "util/Auxiliary";
import { connect } from 'react-redux';
import { createPost, getPosts } from "appRedux/actions/Profile";

class PostList extends Component {

  state = {
    user: {}
  }

  componentWillMount() {
    const userId = this.props.match.params.userId;
//    console.log("USERID", userId)
    this.props.dispatch(getPosts(userId));
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

    this.props.dispatch(createPost(post, this.props.posts, "myPosts"));

//    let postArray = this.state.postList;
//    postArray.unshift(post);

  }

  render() {
//    console.log("Posts", post)
    const {posts, user} = this.props;
    console.log("POSTS", posts)

    return (
      <Auxiliary>
        <WriteBox addPost={this.addPost.bind(this)} user={user} authUser={this.props.authUser}/>
        <div>
        {posts &&
          
          posts.map((post) => {
            return <PostItem key={post._id} index={post._id} text={post.body} postData={post.created} participants={post.participants} photo={post.photo}/>
          }
        )
        }
        { posts && posts.length===0 &&
          <div className="gx-no-content-found gx-text-light gx-text-center">
            { this.props.isAuthorized ?
            <p> Nie masz jeszcze wpisów </p>
            :
            <p>  {user.name} nie ma jeszcze wpisów. </p>
            }
            <p>  Napisz pierwszą serdeczną iskierkę. </p>

        </div>

        }
        
       
        
        </div>
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({profile, auth}) => {
  const { posts, newPost} = profile;
  const {authUser} = auth;
  return {posts, newPost, authUser};
};

export default connect(mapStateToProps)(PostList);

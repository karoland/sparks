import React, {Component} from "react";
import {Avatar, Button, Card, Divider, Input} from "antd";
import AddUser from "./AddUser";
//import AddPhoto from "./AddPhoto";
import FileUpload from "./FileUpload";
import { isAuthorized } from "containers/auth/index";
//import axios from 'util/Api'

const {TextArea} = Input;


class WriteBox extends Component {

  state = {
    commentText: '',
    reciever: undefined,
    image: undefined,
    isOpen:true,
    reset: false,
    uploadedFiles: [],
    key: 1
  };


  handleAddPost() {
    console.log("Reciever AUTH", this.state.reciever)
    
//    this.props.addPost(this.state.commentText, this.state.reciever);
    this.props.addPost(this.state.commentText, (isAuthorized(this.props.user._id) ? this.state.reciever : 
      {reciever: {
            delivery: "User",
            part: "Reciever",
            publicates: true,
            user: this.props.user._id,
          }}
          ),
        this.state.image
    );

    this.setState({
      commentText: '',      
      isOpen: false,
      image:undefined,
      uploadedFiles: [],
      key: this.state.key + 1
//      reciever:undefined,
    });
  }

  onChangeText(e) {
    this.setState({commentText: e.target.value})
  }

  getReciever = (reciever) => {
//    console.log("Reciever", reciever)
    this.setState({reciever})
  }


  imagesHandler = (images) => {
        console.log("Images in imagesHandler", images)

        this.setState({
            image:  images[0],
            uploadedFiles: images
        })
    }


  render() {
//    console.log("Reciever", this.state.reciever)
   // const {fileList, reciever} = this.state;
    const {user, authUser} = this.props;
    //const avatar = JSON.parse(localStorage.getItem("authUser")).avatar


    console.log("WRITE AUTH", user) 

    return (
      <Card className="gx-card">
        <div className="gx-media gx-mb-2">

          {authUser && authUser.avatar ? 
            <Avatar className="gx-mr-3 " size={50} src={authUser.avatar}/> :
            <Avatar size={50} icon="user" className="gx-mr-3 "/> 
          }
          <div className="gx-media-body">
          <div >
            {isAuthorized(user._id) ?
            <div style={{ display: "flex",justifyContent: 'space-between', alignItems: 'flex-start',   flexWrap: 'wrap-reverse' }} 
                  >
            <p className="gx-mb-2" style={{justifyContent: 'start'}}> Napisz miłe wspomnienie</p> 
            <AddUser className="gx-mb-2" style={{justifyContent: 'end'}} getReciever={this.getReciever.bind(this)} reset={this.state.reset} key={this.state.key}/> 
            </div>

            :
            <p className="gx-mb-2" style={{justifyContent: 'start'}}> Napisz coś miłego do <span className="gx-font-weight-medium">{user.name} </span></p>
            }

          </div>
          <TextArea
                    id="exampleTextarea"
                    value={this.state.commentText}
                    multiline="true"
                    rows={4}
                    onChange={(event) => this.onChangeText(event)}
                    placeholder="Wpisz"
                    margin="none"/>
          </div>
        </div>

        <Divider/>

        <div >
      

        </div>


        <div  style={{display: 'flex' , justifyContent: 'flex-end', alignItems: 'center'}}>
            <FileUpload imagesHandler={(images)=> this.imagesHandler(images)} key={this.state.key} />
                <span className="gx-toolbar-separator">&nbsp;</span>

          <Button type="primary" className="gx-mb-0 gx-bg-primary"
            disabled={!this.state.commentText}
            onClick={this.handleAddPost.bind(this)}>WYŚLIJ
          </Button>
        </div>
      </Card>
    )
  }
}

export default WriteBox;

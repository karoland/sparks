import React from "react";
import {Upload, Card, Button, message, Icon } from "antd";
import ImgCrop from "antd-img-crop";
import { connect } from 'react-redux';
import axios from 'util/Api'

import {
  updateAvatar,
} from "appRedux/actions/Profile";


const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class EditPhoto extends React.Component {

  state={
    showForm: false,
    loading: false,
    uploading: false,
    file: "",
    avatar_small: "",
    uploadedFile: '',
  }
//  <Button size="small" type="primary" icon="edit">Edit profile</Button> 


  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    this.setState({
      file: file
    });
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }


  showForm = () => {
    this.setState({showForm:true})
  }
 

  resizeImage = (max_width) => {
    return new Promise((resolve, reject) => {
      let ratio=1;
      let file=this.state.file;

      const fileName = file.name;
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload =  (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let canvas = document.createElement("canvas")
          let ctx = canvas.getContext("2d")
          let canvasCopy = document.createElement("canvas")
          let copyContext = canvasCopy.getContext("2d")

          if(img.width > max_width)
            ratio = max_width / img.width
          else if(img.height > max_width)
            ratio = max_width / img.height

          console.log("RATIO", ratio);

          canvasCopy.width = img.width
          canvasCopy.height = img.height
          copyContext.drawImage(img, 0, 0)

          canvas.width = img.width * ratio
          canvas.height = img.height * ratio
          ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height)

          let dataURL = canvas.toDataURL("image/png");

          let blobBin = atob(dataURL.split(',')[1]);
          let array = [];
          for(let i = 0; i < blobBin.length; i++) {
              array.push(blobBin.charCodeAt(i));
          }
          let newfile=new Blob([new Uint8Array(array)], {type: 'image/png'});
                  resolve(newfile);
        }
  //             reader.onerror = error => console.log(error);
    

     };
  });
}


    handleUpload = async () => {
      console.log("File before upload bf", this.state.file);


      this.resizeImage(200)
      .then(data => {
        console.log("Set Avatars");
        let userData = new FormData();
        userData.set("avatar", this.state.file);

        this.setState({
          uploading: true
        });

//        this.props.dispatch(updateAvatar(this.props.profile._id, userData));
        const userId=this.props.profile._id
        const token = JSON.parse(localStorage.getItem("token"));
        axios.put(`/user/avatar/${userId}`, userData, { headers: {"content-type": "multipart/form-data", "Authorization" : `Bearer ${token}`}}
        ).then(response => {
          console.log("Response", response);

          let authUser = localStorage.getItem("authUser");
          authUser = authUser ? JSON.parse(authUser) : {};
          authUser["avatar"] = response.data.url;
          localStorage.setItem("authUser", JSON.stringify(authUser));

          this.setState({uploading: false, showForm:false, uploadedFile:response.data})
        })
      });

    
 
  }



  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
    //console.log("FILE", info.file, "IMG URL", this.state.imageUrl)
  }

  onRemove = () => {
    this.setState({ imageUrl: "", showForm:false });
  }

  render() {
  const {showForm,loading, uploading, imageUrl} = this.state;

  const uploadButton = (
      <Button loading={loading}>
       {!loading && <Icon type="upload" />} 
        Select File
      </Button>
    );

    return (
      <div>
      { !showForm ? 
      
        <Button ghost style={{  position: 'absolute', bottom: '0%', right: "5%"}} onClick={this.showForm}> 
          Edit photo 
        </Button> :

        <div style={{  position: 'absolute', bottom: '0%', width: '100%', backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
        
        <div style={{ display: "flex",justifyContent: 'space-between', justifyItems: 'center' }} className="gx-mt-2">
        <ImgCrop>
          <Upload style={{justifyContent: 'start'}}
            name="avatar"
            className="avatar-uploader"
            customRequest={dummyRequest}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            onRemove={this.onRemove}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "64px"}} className="gx-mb-2" />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
          <div>
            {imageUrl && (
              <Button style={{justifyContent: 'flex-end'}}
                type="secondary"
                onClick={this.onRemove}
                loading={loading}
              >
                Anuluj
              </Button>
            )}

            <Button style={{justifyContent: 'flex-end'}}
              type="primary"
              onClick={this.handleUpload}
              disabled={!imageUrl}
              loading={uploading}
            
            >
              {uploading ? "Uploading" : "Save"}
            </Button>
          </div>
        </div>


        </div>

 
      }       

      </div> 
    

    );
  }
}



const mapStateToProps = ({profile}) => {
  const { profileData} = profile;

  return {profileData};
};

export default connect(mapStateToProps)(EditPhoto);

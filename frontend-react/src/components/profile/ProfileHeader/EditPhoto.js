import React from "react";
import {Upload, Button, message, Icon } from "antd";
import ImgCrop from "antd-img-crop";
import { connect } from 'react-redux';
//import axios from 'util/Api'

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
      message.error("Możesz załączać tylko formaty JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Zdjęcie musi być mniejsze niż 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }


  showForm = () => {
    this.setState({showForm:true})
  }
 
  handleCancel = () => {
    if(this.props.error) message.error("Wystąpił błąd podczas aktualizacji zdjęcia")
    this.setState({showForm:false, uploading: false})

  }

  resizeImage = (max_width) => {
    return new Promise((resolve, reject) => {
      let ratio=1;
      let file=this.state.file;

      //const fileName = file.name;
      
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

//          console.log("RATIO", ratio);

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



// componentWillReceiveProps(nextProps) {
//     // Any time props.email changes, update state.
//     if (nextProps.uploaded !== this.props.uploaded) {
//           this.setState({showForm:false, uploading: false})

//     }
//   }

    handleUpload = async () => {
  //    console.log("File before upload bf", this.state.file);

      this.resizeImage(200)
      .then(data => {
   //     console.log("Set Avatars");
        let userData = new FormData();
        userData.set("avatar", this.state.file);
        const userId=this.props.profile._id
        this.props.dispatch(updateAvatar(userId, userData, this.props.authUser));
        })
 
  }

  render() {
  const {showForm, uploading, imageUrl} = this.state;
  const {loading} = this.props;

//console.log("Uploading photo uploading", uploading, "loading", loading, "error", error)
 
if(loading && !uploading)  this.setState({ uploading: true});
if(!loading && uploading)  this.handleCancel();
//if(error) this.handleCancel();

  const uploadButton = (
      <Button loading={loading}>
       {!loading && <Icon type="upload" />} 
        Wybierz zdjęcie
      </Button>
    );

    return (
      <div>
      { !showForm ? 
      
        <Button ghost style={{  position: 'absolute', bottom: '0%', right: "5%"}} onClick={this.showForm}> 
          Edytuj zdjęcie 
        </Button> :

        <div style={{  position: 'absolute', bottom: '0%', width: '100%', backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
        
        <div className="gx-mt-2">
        <ImgCrop>
          <Upload 
            customRequest={dummyRequest}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            onChange={this.handleUpload}
           
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "64px"}} className="gx-mb-2" />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>

          <div>
            { !loading &&

            <Button 
              type="primary"
              onClick={this.handleCancel} 
            >
              Anuluj
            </Button>
          }
          </div>
        </div>


        </div>

 
      }       

      </div> 
    

    );
  }
}



const mapStateToProps = ({profile, commonData, auth}) => {
  const { profileData, error, loading} = profile;
//  const { loading } = commonData;
  const {authUser} = auth;

  return {profileData, loading, error, authUser};
};

export default connect(mapStateToProps)(EditPhoto);

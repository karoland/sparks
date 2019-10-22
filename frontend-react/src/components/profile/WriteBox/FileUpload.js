import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'util/Api'
import {Button, message} from "antd";


class FileUpload extends Component {

  //     constructor(){
  //      super();
        state = {
            uploadedFiles: [],
            uploading: false,
            selectingFile: true,
        }
//    }

    onDrop = (files) => {
       this.setState({uploading:true, selectingFile: false});
       let formData = new FormData();
       const config = {
           header: {'content-type':'multipart/form-data'}
       }
       formData.append("file",files[0]);

       axios.post("/photo", formData, config)
       .then(response => {
            console.log("Response", response.data)
            if(response.data.error) {
                message.error("Wystąpił błąd podczas załączania zdjęcia")
                this.setState({uploading:false})
            }
            else
            {
            this.setState({
                uploading:false,
                uploadedFiles:[
                    ...this.state.uploadedFiles,
                    response.data
                ]
            },()=>{
                this.props.imagesHandler(this.state.uploadedFiles)
            })
            }
       }).catch(error => {
            message.error("Wystąpił błąd podczas załączania zdjęcia")
            this.setState({uploading:false})
            console.log("Error****:", error.message);
        });
    }

    onRemove = (id) => {
        axios.get(`/removePhoto?public_id=${id}`).then(response=>{
            let images = this.state.uploadedFiles.filter(item=>{
                return item.public_id !== id;
            });

            this.setState({
                uploadedFiles: images,
                selectingFile: true
            },()=>{
                this.props.imagesHandler(images)
            })
        })
    }

    showUploadedImages = () => (
        this.state.uploadedFiles.map(item=>(
            <div
                key={item.public_id}
            >

            <div className="container-photo">
              <img src={item.url} alt="Snow" style={{width:"100%"}}/>
              <Button className="btn" ghost  type="primary" onClick={()=> this.onRemove(item.public_id)}>Usuń</Button>
            </div>
                
            </div>
        ))
    )


//<img className="gx-img-fluid" src={item.url} style={{ maxHeight: '160px', width: 'auto'}} alt="post"/> 
//                <Button icon="close" className="gx-mt-2"> Usuń</Button>

    // static getDerivedStateFromProps(props,state){
    //     if(props.reset){
    //         return state = {
    //             uploadedFiles:[]
    //         }
    //     }
    //     return null;
    // }


    render() {
    console.log("Images", this.state.uploadedFiles, "reset", this.props.reset, "selectingFile", this.state.selectingFile)

        return (
            <div>
                <section>
                    <div className="">
                        { this.state.uploadedFiles.length===0 ?
                            <Dropzone
                                onDrop={(e)=>this.onDrop(e)}
                                multiple={false}
                            
                            >   
                            {({getRootProps, getInputProps}) => (
                                <section>
                                  <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Button type="default"  loading={this.state.uploading} className="gx-pointer gx-mb-0" >
                                            <i className="icon icon-camera gx-mr-2 gx-fs-xl gx-d-inline-flex gx-vertical-align-middle"/>
                                            <span className="gx-fs-sm"> Dodaj zdjęcie </span>
                                        </Button>
                                  </div>
                                </section>
                            )}
                            </Dropzone>

                            :

                            <div className="">
                                {this.showUploadedImages()}
                            </div>                         
                        }

                        
                    </div>
                </section> 
            </div>
        );
    }
}

export default FileUpload;

import React from "react";
import {Form, Input, message, Modal, Alert, Spin} from "antd";
import AddUser from "components/profile/WriteBox/AddUser";

//import Moment from "moment";
import { connect } from 'react-redux';

//import IntlMessages from "util/IntlMessages";
import { createMessage } from "appRedux/actions/Message";
import SweetAlert from "react-bootstrap-sweetalert";
import {  successViewed } from "appRedux/actions/Message";
//import { isAuthenticated } from "containers/auth/index";


const {TextArea} = Input;

// const props = {
//   name: 'file',
//   action: '//jsonplaceholder.typicode.com/posts/',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

class ComposeMail extends React.Component {

    state = {
      reciever: undefined,
      key: 1,
      result_viewed:false,
    }

  onOK = (e) => {
    e.preventDefault();
    const {reciever} = this.state;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let newmessage={}
        if(this.props.reciever === undefined) {
        if(this.state.reciever===undefined) {
          return message.error('Dodaj odbiorcę');

        }
        else {
          newmessage = {
          title: values.title,
          body: values.message,
          to : (reciever!==undefined ? 
            {
            delivery: reciever.reciever.delivery,
            address: reciever.reciever.address,
            user: reciever.reciever.user,
            } :
            undefined 
            ),
          }
        }
        }
        if(this.props.reciever !==undefined) {
          newmessage = {
          title: values.title,
          body: values.message,
          to :  
            {
            delivery: "User",
            user: this.props.reciever._id,
            },
          }
        }

          console.log("Post Data :==()==>", newmessage)
         this.props.dispatch(createMessage(newmessage, (this.props.messages? this.props.messages : null)));

         // if(this.props.reciever===undefined) this.props.dispatch(createMessage(newmessage, this.props.messages));
         // if(this.props.reciever!==undefined) this.props.dispatch(createMessage(newmessage, null));

          this.setState({result_viewed:true});
//          this.props.load();
//          this.props.onMailSend();
//          this.onCancel();
        
      }
    });
  }

  mailSent= () =>  (
      <div>
        <SweetAlert success title="Wysłano wiadomość!" onConfirm={this.onConfirm}>
          Pomyślnie wysłano wiadomość
        </SweetAlert>
       
        </div>
      )
    //callback();
  

  viewSuccess = () =>{
    message.success("Pomyślnie wysłano wiadomość")
    this.onCancel();
  }


  onCancel = () => {
    //if()
    this.setState({
      reciever: undefined,
      key: this.state.key + 1,
    })
    this.props.form.resetFields();
    this.props.dispatch(successViewed());
    this.props.onClose();
  }

  // componentDidMount() {
  //   if(this.props.reciever) {
  //     const reciever= {reciever: {
  //       delivery: "User",
  //       user:this.props.reciever
  //     }}
  //     this.setState({
  //       reciever:reciever
  //     })
  //   }
  // }

  onConfirm = () => {
    this.onCancel();
//    this.props.dispatch(successViewed());
  };


       // <SweetAlert success title="Wysłano wiadomość!" onConfirm={this.onConfirm}>
       //   Pomyślnie wysłano wiadomoć
       // </SweetAlert>  

  getReciever = (reciever) => {
//    console.log("Reciever", reciever)
    this.setState({reciever})
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const {loading, success, error} = this.props;
    
//    console.log('STATE RECIEVER', this.state.reciever, "Reciever props", this.props.reciever, "Messages", messages)
  console.log("Succes", success, "error", error)  
    return (
      <div>

      <Modal onCancel={this.onCancel} visible={this.props.open}
             title="Nowa sekretna wiadomość"
             closable={false}
             onOk={this.onOK}
             okText="WYŚLIJ"
             style={{zIndex: 2600}}>

      {success &&
        <div>
          {this.viewSuccess()}
        </div>
      }

        <Form layout='vertical'>

          { this.props.reciever  ?

          <Form.Item wrapperCol={{ sm: 24 }} label="Odbiorca">
            {getFieldDecorator('reciever', {
              rules: [{ required: false, message: 'Napisz tytuł' }],
            })(
               <p> {this.props.reciever.name}</p>,            
            )}
          </Form.Item>          
          :
          <Form.Item wrapperCol={{ sm: 24 }} label="Odbiorca">
            {getFieldDecorator('reciever', {
              rules: [{ required: false, message: 'Napisz tytuł' }],
            })(
               <AddUser  getReciever={this.getReciever.bind(this)} key={this.state.key}/>,            
            )}
          </Form.Item>
          }

          <Form.Item wrapperCol={{ sm: 24 }} label="Tytuł wiadomości">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Napisz tytuł' }],
            })(
              <Input 
                placeholder="Tytuł"
                
              />,
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ sm: 24 }} label="Wiadomość">
            {getFieldDecorator('message', {
              rules: [{ required: true, message: 'Napisz wiadomość' }],
            })(
              <TextArea 
                placeholder="Treść"
                autosize={{minRows: 3, maxRows: 6}}
              />,
            )}
          </Form.Item>
        </Form>

        {loading &&
          <div className="gx-loader-view">
            <Spin/>
          </div>
        }
        {error &&
        <div>
          <Alert message="Nie wysłano wiadomości. Spróbuj za chwilę ponownie" type="error" />
        </div>
        }

        
      </Modal>

      
        </div>
    );
  }
}


const mapStateToProps = ({message, commonData}) => {
  const { newMessage, success, messages} = message;
  const { loading, error} = commonData;

  return {newMessage, loading, success, error, messages};
};

const ComposeMessageForm = Form.create()(ComposeMail);

//export default connect(ComposeMessageForm);
export default connect(mapStateToProps)(ComposeMessageForm);

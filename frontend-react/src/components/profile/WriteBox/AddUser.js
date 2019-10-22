import React, { Component } from 'react';
import {Popover, Col, Button, Icon, Input, Radio, Form, Select} from "antd";
import { connect } from 'react-redux';
import { allUsers } from "appRedux/actions/Users";

//import Widget from "components/Widget/index";

const FormItem = Form.Item;
const { Option } = Select;

export class AddUser extends Component {

  state = {
  	radioValue: "user",
  	fetching: false,
  	user: undefined,
    userChosen: undefined,
    //reciever:undefined,
    visible: false,
    data: [],
    value: undefined,
  };


  onChangeRadio = (e) => {
  	console.log(`radio checked:${e.target.value}`);
  	this.setState({radioValue: e.target.value, user:undefined, value:undefined});
}

  componentDidMount() {
    this.props.dispatch(allUsers());
    //this.setState({filtered: this.props.allUsers})
    //console.log("Users from props", this.props.allUsers);
  }


   handleChange = value => {
   	//search user name

   	let user = this.state.data.find(obj => obj._id === value);
   	console.log("FOUND USER", user)
    this.setState({ value, user:user });
    console.log("USER Value", value)

  }


handleSearch = value => {
    this.setState({fetching:true});

    if (value) {
    	let filtered = this.props.allUsers.filter((user)=> {
        let lName = user.name.toLowerCase();
        return lName.indexOf(value.toLowerCase()) > -1 
    })
    this.setState({data: filtered, fetching:false});
    } else {
      this.setState({ data: [], fetching:false });
    }
  }

  handleOkClick = (e) => {
	console.log("Handle Click OK")
	//checking email
	if(this.state.radioValue==="email") {
		this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	console.log("Email prawidłowy", values.email)
	   		this.setState({userChosen:this.state.user})
			this.props.getReciever({reciever: {
	      			delivery: "Email",
	      			address: values.email,
	      			part:"Reciever",
	      			named: values.named,
	      			publicates: false,
	      		}})
	      }
	   //   else {this.setState({reciever: undefined})}
	    });
	}

	if(this.state.radioValue==="user") {
		if(this.state.user) {
			console.log("USER USER", this.state.user)
		this.setState({userChosen:this.state.user.name})
		this.props.getReciever({reciever: {
				delivery:"User", 
				user:this.state.user._id,
				part:"Reciever",
				publicates: true,				
			}});
		}
	}
    this.hide();
  }

hide = () => {
	this.props.form.setFieldsValue({
                email: '',
            });

    this.setState({
    	radioValue: "user",
      	visible: false,
      	user:undefined,
      	value: undefined
    });

    
  };

  emailOnChange = (e) => {
  	this.setState({user: e.target.value})
  }

 handleVisibleChange = visible => {
    this.setState({ visible });
  };

  resetUser = () => {
  	this.props.getReciever({reciever:undefined})
  	this.setState({ userChosen:undefined });
  }


	render() {
		const {getFieldDecorator} = this.props.form;
		const {userChosen} = this.state;
    	const options = this.state.data.map(d => <Option key={d._id}>{d.name}</Option>);


		console.log("Changing user", this.state.user, "UserChosen", userChosen, "reset", this.props.reset)
//		console.log("Filtered users", this.state.filtered)


		return (
			(userChosen ?

			<Button className="gx-mb-2" type="dashed" onClick={this.resetUser}>
				<span className="gx-fs-sm"> {userChosen} </span>
               	<i className="icon icon-close gx-ml-2 gx-fs-xl gx-d-inline-flex gx-vertical-align-middle gx-text-secondary"/>
			</Button>
			
				:
			 <Popover 
			 	placement="bottomRight" title={<p className="gx-mb-0"> Dodaj odbiorcę</p>}
			 	content={

			 	<div style={{width:"300px"}} >

					<div >
						<Radio.Group style={{text:"center", align:"middle"}} onChange={this.onChangeRadio} defaultValue="user" buttonStyle="solid">
		              		<Radio.Button value="user"><i className="icon icon-star"></i> </Radio.Button>
                			<Radio.Button value="email"><i className="icon icon-email"></i></Radio.Button>

		            	</Radio.Group>
		            </div>
		       		

		       		{ (this.state.radioValue==="user" && this.props.allUsers) ?
		       		<div >
		       		<p> Wybierz odbiorcę spośród użytkowników heartySpark </p>
		       			<Select
					        showSearch
					        value={this.state.value}
					        placeholder="Wpisz imię i nazwisko"
					        style={{ width: '100%' }}
					        defaultActiveFirstOption={false}
					        showArrow={false}
					        filterOption={false}
					        onSearch={this.handleSearch}
					        onChange={this.handleChange}
					        notFoundContent={null}
      					>
        				{options}
      					</Select>					 	
					</div>
                	 :null
		       		}

		       		{ this.state.radioValue==="email" &&
		       			<div>
		       			<p> Wyślij wiadomość na pocztę email </p>

			       		<FormItem label="Adres email" style={{margin: "auto", width: '100%',  display:"block"}} >
	                  		{getFieldDecorator('email', {
	                    		rules: [{
	                      		required: true, type: 'email', message: "Wpisz poprawny adres email",
	                    	}],
	                  		})(

	                    		<Input placeholder="Email" allowClear style={{ width: '100%'}} className="gx-pr-0 "
	                    			onChange={this.emailOnChange}
	                    			prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
	                    		/>
	                  		)}

	                	</FormItem>
	                	<FormItem label="Imię i nazwisko" style={{margin: "auto", width: '100%',  display:"block"}} >
	                  		{getFieldDecorator('named', {
	                    		rules: [{
	                      		required: true,  message: "Podaj imię i nazwisko odbiorcy",
	                    	}],
	                  		})(

	                    		<Input placeholder="Imię i nazwisko" allowClear style={{ width: '100%'}} className="gx-pr-0"
	                    			
	                    			prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
	                    		/>
	                  		)}

	                	</FormItem>

	                	
	                	</div>
		       		}
		       		{ this.state.radioValue==="fb" &&
		       			<div>
		       			<p> Wybierz użytkownika FB i wyślij wiadomość na messenger </p>

			       		
	                    		<Input placeholder="FB" allowClear style={{ width: '100%'}} className="gx-pr-0"
	                    			
	                    			
	                    		/>
	                  		

	                	
	                	</div>
		       		}
		       		<Col span={24} className="gx-mt-4">
						<Button type="primary" disabled={!this.state.user} onClick={this.handleOkClick} > OK </Button>
						<Button type="secondary" onClick={this.hide} > Anuluj </Button>
					</Col>
		       	</div>
			 	}

			 	visible={this.state.visible}
			 	onVisibleChange={this.handleVisibleChange}
			 	trigger="click">

        		<Button className="gx-mb-2" icon="user-add" type="primary" ghost >
              		<span className="gx-fs-sm"> Odbiorca </span>
            	</Button>
      		</Popover>
		    )
		);
	}
}

const mapStateToProps = ({users}) => {
  const { allUsers} = users;

  return {allUsers};
};

const AddUserForm = Form.create()(AddUser);

export default connect(mapStateToProps)(AddUserForm);


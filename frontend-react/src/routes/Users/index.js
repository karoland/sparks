import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { allUsers } from "appRedux/actions/Users";

import {Col, Row, Input} from "antd";
//import ContainerHeader from "components/ContainerHeader/index";
//import IntlMessages from "util/IntlMessages";
import CardsListItem from "./CardsListItem";


const Search = Input.Search;

class Users extends Component {

  state = {
    filtered: [],
    touched: false
  }

  inputChangeHandler = (event) => {
    let keywords = event.target.value;
    this.setState({touched: true})
    let filtered = this.props.allUsers.filter((user)=> {
        let lName = user.name.toLowerCase();
        return lName.indexOf(keywords.toLowerCase()) > -1
    })
    this.setState({filtered});
    console.log(filtered);
  }

  componentDidMount() {
    this.props.dispatch(allUsers());
    //console.log("Users from props", this.props.allUsers);
  }

  filteredUsers = (users) => {

    return (

    <Row>
      {users.map((data, index) => (<Col  className="gx-mb-4" key={index} xl={6} md={8} sm={12} xs={12}>
          <CardsListItem key={index} data={data}/>
        </Col>
      ))}
    </Row>
 
    )
  }


  render() {

    const { allUsers } = this.props;
//    console.log("State filtered", this.state.filtered);
//    console.log("Props users", allUsers);

let box = document.querySelector('Card');
    console.log("Elment", box)

      return (
        <div className="container">
          <h2 className="mt-5 mb-5">Szukaj znajomych</h2>
          <div className="gx-main-content gx-pb-sm-4">
              
            <Search autoFocus={true} placeholder="Wpisz imię i nazwisko" onChange={this.inputChangeHandler} enterButton="SZUKAJ" size="large"/>

            { allUsers &&
              
              <div>
                {(this.state.filtered===0 || !this.state.touched) ? 
                  this.filteredUsers(allUsers) 
                : this.filteredUsers(this.state.filtered)
                }
               </div>
            }
          </div>    
        </div>
      );
    }
  }

const mapStateToProps = ({users, commonData}) => {
  const { allUsers} = users;
  const { loading} = commonData;


  return {allUsers, loading};
};

export default connect(mapStateToProps)(Users);

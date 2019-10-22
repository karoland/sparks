import React from "react";
import {Button, Card} from "antd";
//import { connect } from 'react-redux';
//import {Link} from "react-router-dom";
import AddItem from './AddItem';



class EditList extends React.Component {

  state = {
    loading: false,
    editing: false,
  };


  isEditing =() => {
  if(this.state.editing) {return <Button className="gx-mb-0 gx-mt-0"  type="secondary" onClick={this.handleOk}> Koniec edycji </Button> }
    else return <Button className="gx-mb-0 gx-mt-0"  type="link" icon="edit" onClick={this.handleEdit}> Edytuj </Button>
  };

  handleOk = () => {
        this.setState({loading: false, editing: false});
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

   addItem = (k, type) => {
    console.log('Item to add in EditPlaces: ', k.value);
    
    this.props.addItem(k.value, this.props.type);
  
  };

  render() {
    const {editing} = this.state;
    const {data, type, title} = this.props;

//    console.log("TPE", this.props.data)
  
    return (
        <div>
          <Card type="inner" title={title} size="small" 
            extra={this.isEditing()}
            style={{ width: '100% '}}>
            
            { !editing? 

            (data.length===0 ? 
                  <p className="gx-mb-0 gx-text-light-grey">Brak danych</p> : 
                  data.map((p, index) => (
                    <p key={index} className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                    ))

                  ) :
          
            <div>
              
            {data.map((p, index) => (
              <div key={index} className="gx-d-flex">
                <p className="gx-mb-0 gx-mt-2" style={{lineHeight: "90%"}}>{p}</p>
                
                <Button 
                  size="small" icon="delete" style={{marginLeft: 'auto'}} type="dashed" 
                  onClick={() => {this.props.removeItem(p, type)}} >
                  Usuń
                </Button>
               </div>
              ))
            }
            
            <AddItem addItem={this.addItem.bind(this)} type={this.props.type} icon={this.props.icon} /> 
            </div>
        
            }

          </Card>
        </div>
    );
  }
}


export default EditList;
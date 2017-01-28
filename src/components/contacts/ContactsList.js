import React, {PropTypes, Component} from 'react';
import Contact from './Contact';
import {List} from 'material-ui/List';

import './Contacts.css'



class ContactsList extends Component {


  render() {
 
    const {contacts, removeContact} = this.props
    if(Object.keys(contacts).length > 0)
      return (
          <div style={{marginTop: 100}} className="row">
            <List style={{width:'100%'}}>
            {Object.keys(contacts).map((key, index) => 
                <Contact removeContact={removeContact} key={key} contact={Object.assign({},contacts[key], {key: key})}/>           
            )}
            </List>
          </div>
      )
    else 
      return(<div></div>) 
  }
}


ContactsList.propTypes = {
  contacts: PropTypes.object.isRequired,
  removeContact: PropTypes.func.isRequired
}

export default ContactsList;
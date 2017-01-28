import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import * as actions from '../../actions/contacts';
import ContactsList from './ContactsList';
import {grey100, darkBlack} from 'material-ui/styles/colors';


class ContactsPage extends Component {

  componentDidMount() {
      this.props.fetchAllContacts();
  }

  render() {
    const { contacts, removeContact } = this.props;

    const containerStyle = {
      position: 'fixed',
      top: 50,
      backgroundColor: grey100,
      height: 50,
      width: '100%',
      zIndex: 3
    }

    const buttonStyle = {
      position: 'relative',
      float: 'right',
      marginTop: 7,
      marginRight: 5
    }
    return (
      <div>
          <div style={containerStyle}>    
            <RaisedButton style={buttonStyle} color={darkBlack} label="Crear contacto" primary={true} containerElement={<Link to="/contacts/add" />}/>
          </div>
        <ContactsList contacts={contacts} removeContact={removeContact} />
      </div>
    )
  }
}

ContactsPage.propTypes = {
  contacts: PropTypes.object.isRequired,
  fetchAllContacts: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {    
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
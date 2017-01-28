import {firebaseApp} from './firebase';
import {browserHistory } from 'react-router'

function fetchAllContacts() {
  return (dispatch, getState) => {
    if(getState().auth.uid) {
      let firebaseContacts = firebaseApp.database().ref('public-contacts');
      firebaseContacts.on('value', (result) => {  
        dispatch({
          type: 'RECEIVE_ALL_CONTACTS',
          contacts: result.val() ? result.val() : {}
        });
      })
    }    
  }
}

function addContact(contactData) {
  return (dispatch, getState) => {
    // create a new unique key to store our contact data 
    let user = firebaseApp.auth().currentUser;
    if(user) {
      let firebaseContacts = firebaseApp.database().ref('public-contacts');
      contactData = Object.assign({}, contactData, {createdBy: getState().auth.uid})
      firebaseContacts.push(contactData).then((data) => {
        dispatch({
          type: 'OPEN_SNACK',
          message: "Se ha creado usuario!"
        })
      })
      .catch(error => {
        console.log("Error saving contact: ", error);
      });
    }
  }
};

function back() {
  return (dispatch) => {
    browserHistory.push('/contacts');
  }
}

function updateContact(contact) {
  return (dispatch) => {
    // create a new unique key to store our contact data 
    let user = firebaseApp.auth().currentUser;
    if(user) {
      let firebaseContacts = firebaseApp.database().ref('public-contacts/'+contact.key);
      delete contact.key
      firebaseContacts.set(contact).then(() => 
        dispatch({
          type: 'OPEN_SNACK',
          message: "Usuario actualizado!"
        })      
      )
      .catch(error => {
        console.log("Error saving contact: ", error);
      });
    }
  }
};

function readContact(contactKey) {
  return (dispatch, getState) => {
    let contact = getState().contacts[contactKey];
    if (contact)
        dispatch({
          type: 'READ_CONTACT',
          contact: Object.assign({}, contact, {key: contactKey})
        })
    else
      firebaseApp.database().ref('public-contacts/'+contactKey).on('value', result =>
        dispatch({
          type: 'READ_CONTACT',
          contact: Object.assign({}, result.val(), {key: contactKey})
        })
      )
    dispatch({
      type: 'CLEAN_CONTACT_TASKS'
    })    
  }
}

function removeContact(contact) {
  return (dispatch) => {
      firebaseApp.database().ref('public-contacts/'+contact.key).remove().then(() =>
        dispatch({
          type: 'OPEN_SNACK',
          message: "Usuario eliminado!"
        })       
      )
  }
}
 
function change(contact) {
  return (dispatch) => {
    dispatch({
      type: 'READ_CONTACT',
      contact: contact
    })
  }
}

export {
  fetchAllContacts,
  readContact, 
  addContact,
  updateContact,
  removeContact,
  back,
  change
};
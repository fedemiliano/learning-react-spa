import {firebaseApp} from './firebase';
import {browserHistory } from 'react-router'
import Global from '../global'
import {getHours} from '../common'
const Firebase = require('firebase');

let visits = null

function fetchAllMessages(messagesKey) {
  let fetchedMessages = [];

  return (dispatch, getState) => {
    if(getState().auth.uid) {
      dispatch({
        type: 'RECEIVE_ALL_MESSAGES',
        messages: {key: messagesKey, data: []}
      });

      let connectedRef = firebaseApp.database().ref('.info/connected'); 
      connectedRef.on('value', (snap) => {
        if(snap.val() === true) {
          let code = Global.platform.description.replace(/\./g, '@');
          code = code.replace(/\//g, '=');
          if(Global.incognito)
            code += '_incognito'
          visits = firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+getState().auth.uid+'/visits/'+code).push(true)
          visits.onDisconnect().remove()      
          firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+getState().auth.uid+'/lastVisit').onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP)  
        }
      })

      firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+getState().auth.uid)
      .child('toRead').transaction(toRead => {
        toRead = 0
        return toRead
      }) 

      firebaseApp.database().ref('groups/'+messagesKey+'/members').on('value', (result) => {
        let keys = Object.keys(result.val())
        keys.forEach(key => {
          if(key !== getState().auth.uid) {
            firebaseApp.database().ref('presence/'+key).on('value', value => {
              let val = value.val()
              let online = val.connections ? 'Online' : getHours(val.lastOnline)
              dispatch({
                type: 'USERNAME_TO',
                messages: {toOnline: online, toUsername: val.username, toUid: val.uid}
              });
              firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+val.uid).on('child_removed', () =>
                dispatch({
                  type: 'TO_VISITING',
                  messages: {toVisiting:false}
                })
              )

              firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+val.uid).on('child_added', (data) => {
                if(data.key === 'visits')
                  dispatch({
                    type: 'TO_VISITING',
                    messages: {toVisiting: true}
                  })
              })                
            });            
          }             
        })
      }); 
      firebaseApp.database().ref('group-messages/'+messagesKey).on('child_added', (result) => {
        fetchedMessages.push(result.val());
        dispatch({
          type: 'RECEIVE_ALL_MESSAGES',
          messages: {key: messagesKey, data: fetchedMessages}
        });
      });
    }    
  }
}


function createMessage(userInvited) {
  console.log(userInvited)
  return (dispatch, getState) => {
    // create a new unique key to store our Message data 
    let uid = getState().auth.uid     
    let makeMessage = {}
    if(!userInvited.messageKey) {
      let messagesRead = {}
      messagesRead['lastVisit'] = 0
      messagesRead['toRead'] = 0
      let messageKey = firebaseApp.database().ref('groups').push().key;
      makeMessage['groups/'+messageKey+'/members/'+userInvited.uid] = true
      makeMessage['groups/'+messageKey+'/members/'+uid] = true
      makeMessage['messages-read/'+messageKey+'/members/'+uid] = Object.assign({}, messagesRead, {fromUid: userInvited.uid})
      makeMessage['messages-read/'+messageKey+'/members/'+userInvited.uid] = Object.assign({}, messagesRead, {fromUid: uid})   
      makeMessage['users/'+uid+'/groups/'+messageKey] = true
      makeMessage['users/'+userInvited.uid+'/groups/'+messageKey] = true
      firebaseApp.database().ref().update(makeMessage)
      .then((result) => {
        browserHistory.push("/messages/"+ messageKey);
      }) 
      .catch(error => {
        console.log("Error saving Message: ", error);
      });         
    } else {
      browserHistory.push("/messages/"+ userInvited.messageKey);
    }
  }
};

function leaveMessages(messagesKey) {
  return (dispatch) => {
    // create a new unique key to store our Message data 
    let user = firebaseApp.auth().currentUser;
    if(user) {
      visits.onDisconnect().cancel()
      visits.remove()
      firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+user.uid+'/lastVisit').onDisconnect().cancel()
      firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+user.uid+'/lastVisit').set(Firebase.database.ServerValue.TIMESTAMP)   
    }   
  }
};

function addMessage(txt, messagesKey) {
  return (dispatch, getState) => {
    // create a new unique key to store our Message data 
    let user = firebaseApp.auth().currentUser;
    if(user) {
      firebaseApp.database().ref('group-messages/'+messagesKey).push({
        userUid: user.uid,
        userEmail: user.email,
        msg: txt,
        dateTime: Firebase.database.ServerValue.TIMESTAMP
      })
      if(!getState().messages.toVisiting)  {
        firebaseApp.database().ref('messages-read/'+messagesKey+'/members/'+getState().messages.toUid)
        .child('toRead').transaction(toRead => {
          if(toRead === 0)
            firebaseApp.database().ref('alerts-user/'+getState().messages.toUid+'/'+messagesKey).set({
              timeCreated: Firebase.database.ServerValue.TIMESTAMP,
              type: 'MESSAGES',
              description: 'Tienes nuevos mensajes de ' + user.email
            })
          toRead++
          return toRead
        })        
      } 
    }   
  }
};

function back() {
  return (dispatch) => 
  browserHistory.push("/users")
}

export {
  createMessage,
  fetchAllMessages,
  addMessage,
  back,
  leaveMessages
};
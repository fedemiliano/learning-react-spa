import {firebaseApp} from '../firebase';

function fetchAllUsers() {
  return (dispatch, getState) => {
    if(getState().auth.uid) {
      let firebaseUsers = firebaseApp.database().ref('presence');
      let uid = getState().auth.uid
      firebaseUsers.on('value', (result) => {        
        dispatch({
          type: 'RECEIVE_ALL_USERS',
          users: result.val(),
          uid: uid
        })
        firebaseApp.database().ref('users/'+uid+'/groups/').on('child_added', (groupData) => {
          firebaseApp.database().ref('messages-read/'+groupData.key+'/members/'+uid).on('child_changed', (data) => {
            if(data.key === 'toRead')
                dispatch({
                  type: 'NEW_MESSAGES',
                  toRead: data.val(),
                  messageKey: groupData.key
                })                  
          }) 
          firebaseApp.database().ref('messages-read/'+groupData.key+'/members/'+uid).on('value', (data) => {
            dispatch({
              type: 'USER_MESSAGES',
              fromUid: data.val().fromUid,
              toRead: data.val().toRead,
              messageKey: groupData.key
            })
          })                  
        })         
      })     
      firebaseUsers.on('child_added', (result) => {
        if(result.val().uid !== uid) {
          dispatch({
            type: 'ADD_USER',
            user: result.val()
          });       
        }
      });
    }    
  }
}


export {
  fetchAllUsers
};
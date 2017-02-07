import {firebaseApp} from '../firebase';

function fetchAllUsers(type) {
  return (dispatch, getState) => {   
    if(!getState().events.users) {
      dispatch({
        type: "EVENTS_USERS"
      })
      let firebaseUsers = firebaseApp.database().ref('presence');
      let uid = getState().auth.uid
      firebaseUsers.on('child_added', (result) => {
        let userVal = result.val()
        let user = {}
        user[result.key] = userVal     
        if(userVal.uid !== uid)   
          dispatch({
            type: 'USER_ADDED',
            user: user
          }) 
      })
      firebaseUsers.on('child_changed', (result) => {
        let userVal = result.val()
        let user = {}
        user[result.key] = userVal     
        if(userVal.uid !== uid)   
          dispatch({
            type: 'USER_CHANGED',
            user: user
          }) 
      })      
                         
    }    
  }
}


export {
  fetchAllUsers
};
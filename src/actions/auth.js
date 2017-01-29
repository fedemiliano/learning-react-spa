import {firebaseApp} from '../firebase';
import {browserHistory } from 'react-router'
import Global from '../global'
const Firebase = require('firebase');

let firebase = firebaseApp;

let connectedRef = firebase.database().ref('.info/connected'); 

function onlineOffline(uid) {
  connectedRef.on('value', (snap) => {
   if(snap.val() === true) {
      let code = Global.platform.description.replace(/\./g, '@');
      code = code.replace(/\//g, '=');
      if(Global.incognito)
        code += '_incognito'
      firebase.database().ref('presence/'+uid+'/connections/'+code).push(true).onDisconnect().remove()
      firebase.database().ref('presence/'+uid+'/lastOnline').onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP)  
    }
  })
}

let usr = JSON.parse(localStorage.getItem("usr"))
if(usr != null) {
  onlineOffline(usr.uid)
  if(window.location.pathname === '/login' ||
     window.location.pathname === '/register')
     browserHistory.push('/dashboard')
}

function startListeningToAuth() {
  return (dispatch, getState) => {
    let usr = JSON.parse(localStorage.getItem("usr"))
    if(usr)
      dispatch({
        type: 'START',
        email: usr.email,
        uid: usr.uid,
        token: usr.token,
        username: usr.username
      });    
    firebase.auth().onAuthStateChanged(authData => {
      if (authData) { 
        let usr = JSON.parse(localStorage.getItem("usr"))
        if(usr) {
          //onlineOffline(usr.uid)          
          dispatch({
            type: 'LOGIN',
            email: usr.email,
            username: usr.username,
            uid: usr.uid,
            token: usr.token
          });
        }    

        //browserHistory.push('/');
    } else {
        if (getState().auth.status !== 'ANONYMOUS') {
          localStorage.removeItem("usr")
          dispatch({
            type: 'LOGOUT',
            token: null
          });
        }
      }
    });
  }
};


function register(email, pw, name) {
  return (dispatch) => {
    dispatch({
      type: 'ATTEMPTING_REGISTER'
    });
    let code = Global.platform.description.replace(/\./g, '@');
    code = code.replace(/\//g, '=');
    if(Global.incognito)
        code += '_incognito'
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(result => {
      firebase.database().ref('users/' + result.uid).set({
        email: result.email,
        username: name
      }).then(()=>{
        firebase.database().ref('presence/'+result.uid).set({
          email: result.email,
          username: name,
          uid: result.uid
        }).then(()=> {
          firebase.database().ref('presence/'+result.uid+'/connections/'+code).push(true).onDisconnect().remove()
          firebase.database().ref('presence/'+result.uid+'/lastOnline').onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP)  
          let user = firebaseApp.auth().currentUser;
          user.getToken(/* forceRefresh */ true).then(function(idToken) {
            let usr = JSON.stringify({uid: result.uid, token: idToken, email: result.email, username: name})
            localStorage.setItem("usr", usr);
            dispatch({
                type: 'REGISTER',
                uid: result.uid,
                email: result.email,
                token: idToken,
                username: name
              });           
          });
        });
      });

      browserHistory.push('/dashboard');
    })
    .catch(error => {
      console.log('Error registering in: ', error);
    });
  }
};

function logIn(email, pw) {
  return (dispatch) => {
    dispatch({
      type: 'ATTEMPTING_LOGIN'
    });
    firebase.auth().signInWithEmailAndPassword(email, pw)
    .then(result => {
        let user = firebase.auth().currentUser;
        user.getToken(/* forceRefresh */ true).then(function(idToken) {
          firebase.database().ref('users/'+user.uid).on('value', value => {
            let usr = JSON.stringify({uid: result.uid, token: idToken, email: result.email, username: value.val().username})
            localStorage.setItem("usr", usr);  
            dispatch({
                  type: 'LOGIN',
                  uid: result.uid,
                  email: result.email,
                  token: idToken,
                  username: value.val().username
            });               
          })
      }); 
      let code = Global.platform.description.replace(/\./g, '@');
      code = code.replace(/\//g, '=');
      if(Global.incognito)
          code += '_incognito'
      firebase.database().ref('presence/'+user.uid+'/connections/'+code).push(true).onDisconnect().remove()
      firebase.database().ref('presence/'+user.uid+'/lastOnline').onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP)  
      console.log('Sign in successful!')   
      //TODO
                
      browserHistory.push('/dashboard');  
    })
    .catch(error => {
      console.log('Error logging in: ', error);
    });
  }
};

function logOut() {
  return (dispatch) => {
    let user = firebaseApp.auth().currentUser;
    let code = Global.platform.description.replace(/\./g, '@');
    code = code.replace(/\//g, '=');
    if(Global.incognito)
        code += '_incognito'
    firebase.database().ref('presence/'+user.uid+'/lastOnline').onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP)  
    firebase.database().ref('presence/'+user.uid+'/connections/'+code).remove().then(() => { 
      firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("usr")  
        dispatch({
          type: 'LOGOUT',
          token: null
        });              
        console.log('Sign out successful!')
        browserHistory.push('/');  
      })
      .catch(error => {
        console.log('SIGN OUT ERROR: ', error);
      });
    });  
  }
};

export {
  startListeningToAuth,
  logIn,
  logOut,
  register
};
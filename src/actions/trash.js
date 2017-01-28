import {firebaseApp} from './firebase';
import * as actionsTasks from './tasks'
//const Firebase = require('firebase');

function fetchAllTrash() {
  console.log("fetchAllTrash()")
  return (dispatch, getState) => {
    if(getState().auth.uid) {
      if(Object.keys(getState().trash).length  === 0) {
        let fbTrash = firebaseApp.database().ref('trash/'+getState().auth.uid);
        fbTrash.on('child_added', (result) => {        
          let trash = {}
          trash[result.key] = result.val()
          dispatch({
            type: 'ADDED_TRASH',
            trashItem: trash
          });
        }) 
        fbTrash.on('child_removed', (result) => {        
          let trash = {}
          trash[result.key] = result.val()
          dispatch({
            type: 'REMOVED_TRASH',
            trashItem: trash
          });
        })         
      }
    }
  }    
}

function removeTrashItem(trashItem, from = 'page') {
  return (dispatch, getState) => {
    console.log("remove trash item!!")
    console.log(trashItem)
    console.log(getState().auth)
    if(getState().auth.uid) {
      console.log('trash/'+getState().auth.uid+'/'+trashItem.key)
      firebaseApp.database().ref('trash/'+getState().auth.uid+'/'+trashItem.key).remove().then(() => {
        let msg 
        if(trashItem.dropped.type === 'task' && from === 'page')
          msg = "Tarea eliminada!"
        else
          msg = "Tarea restaurada!"
        dispatch({
          type: 'OPEN_SNACK',
          message: msg
        })
      })
      .catch(error => 
        console.log(error) 
      )
    }
  }    
}

function restoreTrashItem(trashItem) {
  return (dispatch, getState) => {
    console.log("restore trash item!!")
    console.log(trashItem)
    if(getState().auth.uid) {
      dispatch(removeTrashItem(trashItem, "restore"))
      if(trashItem.dropped.type === 'task') {
        dispatch(actionsTasks.create(trashItem))
      }
    }
  }    
}

function removeTrash() {
  return (dispatch, getState) => {
    console.log("remove trash!!")
    dispatch({
      type: 'OPEN_DIALOG_ERROR',
      message: "Debe seleccionar al menos 1 item."
    });

    /*
    if(getState().auth.uid) {
      let fbTrash = firebaseApp.database().ref('trash/'+getState().auth.uid);
      fbTrash.on('child_added', (result) => {        
        let trash = {}
        trash[result.key] = result.val()
        dispatch({
          type: 'ADDED_TRASH',
          trashItem: trash
        });
      }) 
    }
    */
  }    
}

function toCheck(trashItem, checked) {
  console.log(trashItem)
  return (dispatch, getState) => {
    if(checked)
      dispatch({
        type: 'CHECK_ITEM_TRASH',
        trashItem: trashItem
      })
    else
      dispatch({
        type: 'UNCHECK_ITEM_TRASH',
        trashItem: trashItem
      }) 
  }  
}

export {
  fetchAllTrash,
  removeTrashItem,
  removeTrash,
  restoreTrashItem,
  toCheck
}
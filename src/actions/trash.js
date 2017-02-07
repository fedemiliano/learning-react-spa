import {firebaseApp} from '../firebase';
import * as actionsTasks from './tasks'

function fetchAllTrash() {
  return (dispatch, getState) => {
    if(Object.keys(getState().trash).length  === 0) {
      let fbTrash = firebaseApp.database().ref('trash/'+getState().auth.uid);
      fbTrash.on('child_added', (result) => {        
        dispatch({
          type: 'ADDED_TRASH',
          trashItem: {[result.key]:result.val()}
        });
      }) 
      fbTrash.on('child_removed', (result) => {        
        dispatch({
          type: 'REMOVED_TRASH',
          itemKey: result.key
        });                           
      })         
    }
  }    
}

function removeTrashItems(trashItems, from = 'remove') {
  return (dispatch, getState) => {
    let updates = {}
    let data = {}
    let itemsState = {'trash': []}
    Object.keys(trashItems).forEach( key => {
      let trashItem = trashItems[key]
      if(trashItem.checked)
        delete trashItem['checked']
      updates['trash/'+getState().auth.uid+'/'+key] = null
      data['trash/'+getState().auth.uid+'/'+key] = trashItem 
      itemsState['trash'].push(key)
    })
    let total = Object.keys(updates).length  
    firebaseApp.database().ref().update(updates).then(() => {
      let msg
      if(from === 'remove') {
        msg = total === 1 ? "Item eliminado" : total + " items eliminados"
        dispatch({
          type: 'OPEN_SNACK',
          message: msg, 
          data: data,
          items: itemsState
        })        
      } else if(from === 'restore') {
        msg = total === 1 ? "Item restaurado" : total + " items restaurados"        
        dispatch({
          type: 'OPEN_SNACK',
          message: msg,
          items: itemsState
        })
      }
    }).catch( error => 
      console.log(error)
    )
  }    
}

function restoreTrashItems(trashItems) {
  return (dispatch, getState) => {
    dispatch(removeTrashItems(trashItems, "restore"))
    Object.keys(trashItems).forEach( (key, index) => {
      let item = trashItems[key]
      if(item.dropped.type === 'task') 
        dispatch(actionsTasks.create(item))
    })
  }    
}

function removeTrash(from='remove') {
  return (dispatch, getState) => {
    let trash = getState().trash
    let toDrop = {}
    Object.keys(trash).forEach( (key, index) => {
      if(trash[key].checked) {
        toDrop[key] = trash[key]
      }     
    })
    let keys = Object.keys(toDrop)
    let total = keys.length
    if(total === 0) {
      dispatch({
        type: 'OPEN_DIALOG_ERROR',
        message: "Debe seleccionar al menos 1 item."
      })
    } else {
      if(from === 'restore')
        dispatch(restoreTrashItems(toDrop))
      else
        dispatch(removeTrashItems(toDrop))
    }
  }    
}

function restoreTrash() {
  return (dispatch, getState) =>
    dispatch(removeTrash('restore'))
}
   


function toCheck(itemKey, checked) {
  console.log(itemKey)
  return (dispatch, getState) => {
    if(checked)
      dispatch({type: 'CHECK_ITEM_TRASH', itemKey: itemKey})
    else
      dispatch({type: 'UNCHECK_ITEM_TRASH', itemKey: itemKey})
  }  
}

export {
  fetchAllTrash,
  removeTrashItems,
  removeTrash,
  restoreTrash,
  restoreTrashItems,
  toCheck
}
import {firebaseApp} from '../firebase';

function close() {
  return (dispatch, getState) => {
    let itemsKeys = Object.keys(getState().snack.items)
    let key = itemsKeys.length > 0 ? itemsKeys[0] : null
    if(key)
      dispatch({
        type: 'REMOVE_'+key.toUpperCase()+'_KEYS',
        keys: getState().snack.items[key] 
      })    
    dispatch({
      type: 'CLOSE_SNACK'
    })    
  }        
}

function undo() {
  return (dispatch, getState) => {
    console.log("accion.undo()")
    firebaseApp.database().ref().update(getState().snack.data).then()
      dispatch({
        type: 'OPEN_SNACK',
        message: 'Se ha deshecho su acción'
      })
  }          
}

export {
    close,
    undo
}
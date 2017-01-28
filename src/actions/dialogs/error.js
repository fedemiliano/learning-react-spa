function showError(message) {
  return (dispatch) => {   
    dispatch({
      type: 'OPEN_DIALOG_ERROR',
      message: message
    })   
  }        
}

function closeError() {
  return (dispatch) => {
    dispatch({
      type: 'CLOSE_DIALOG_ERROR'
    })
  }        
}

export {
  showError,
  closeError
}
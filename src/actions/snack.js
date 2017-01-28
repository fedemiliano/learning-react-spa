function close() {
  return (dispatch, getState) => {
        dispatch({
          type: 'CLOSE_SNACK'
        })
  }        
}

export {
    close
}
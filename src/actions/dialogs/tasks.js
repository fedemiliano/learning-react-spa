function open(title, operation, task, associatedTo) {
  if(task) {
    task = Object.assign({}, task, {date: new Date(task.timeLimit), time: new Date(task.timeLimit)})
  }
  return (dispatch) => {
    if(operation === 'UPDATE' || operation === 'DELETE')
      dispatch({
        type: 'READ_TASK',
        task: task
      })    
    else 
      dispatch({
        type: 'READ_TASK',
        task: {}
      })     
    dispatch({
      type: 'OPEN_DIALOG_TASK',
      title: title,
      operation: operation,
      associatedTo: associatedTo
    })   
  }        
}

function close() {
  return (dispatch) => {
    dispatch({
      type: 'CLOSE_DIALOG_TASK'
    })
  }        
}

export {
  open,
  close
}
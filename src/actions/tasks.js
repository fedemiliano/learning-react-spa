import {firebaseApp} from '../firebase';
const Firebase = require('firebase');

function create(task) {
  return (dispatch, getState) => {
    let db = firebaseApp.database()
    task = Object.assign({}, task, {createdBy: getState().auth.uid, 
                                    timeCreated: Firebase.database.ServerValue.TIMESTAMP})

    console.log(task)
    let fromTrash = false
    if(task.dropped) {
      fromTrash = true
      delete task['dropped']
    }
      

    db.ref('tasks').push(task).then((data) => {
      if(!fromTrash) {
        dispatch({
          type: 'CLOSE_DIALOG_TASK'
        })      
        dispatch({
          type: 'OPEN_SNACK',
          message: "Se ha creado una tarea!"
        })
        dispatch({
          type: 'NEW_TASK'
        }) 
      } 
      if(task.associatedTo) {
        db.ref('contact-tasks/'+task.associatedTo.key+'/'+data.key).set(task)
        .catch(error => {
          console.log("Error saving task: ", error);
        });    
      }            
    })
    .catch(error => {
      console.log("Error saving task: ", error);
    });    
  }        
}

function update(task, finishTime = null) {
  console.log("UPDATEEEE")
  return (dispatch, getState) => {
    let db = firebaseApp.database().ref();
    let taskKey = task.key
    delete task.key
    delete task.date
    delete task.time
    let taskUpdate = {}
    if(!finishTime)
      task = Object.assign({}, task, {timeUpdated: Firebase.database.ServerValue.TIMESTAMP, timeFinished: null})
    else
      task = Object.assign({}, task, {timeFinished: Firebase.database.ServerValue.TIMESTAMP})
    taskUpdate['tasks/'+taskKey] = task
    if(task.associatedTo)
      taskUpdate['contact-tasks/'+task.associatedTo.key+'/'+taskKey] = task
    console.log(taskUpdate)   
    db.update(taskUpdate).then((data) => {
      dispatch({
        type: 'CLOSE_DIALOG_TASK'
      })      
      dispatch({
        type: 'OPEN_SNACK',
        message: "Se ha modificado una tarea!"
      })
    })
    .catch(error => {
      console.log("Error saving task: ", error);
    });    
  }        
}

function fetchAllTasks() {
  console.log("fetchAllTasks(associatedTo)")
  return (dispatch, getState) => {
    let fbTasks
    let lnk = '/tasks'
    let pathname = getState().routing.locationBeforeTransitions.pathname
    if(pathname !== lnk)
      lnk = pathname.replace('/contacts', 'contact-tasks')
    console.log("#####")
    console.log(lnk)
    if(getState().auth.uid) {
      if(lnk === '/tasks' && Object.keys(getState().tasks).length  === 0) {
        fbTasks = firebaseApp.database().ref(lnk.replace('/', ''))
        fbTasks.on('child_added', (result) => {        
          let task = {}
          task[result.key] = result.val()
          dispatch({
            type: 'ADDED_TASK',
            task: task
          });
        }) 
        fbTasks.on('child_changed', (result) => {        
          let task = {}
          task[result.key] = result.val()
          dispatch({
            type: 'CHANGED_TASK',
            task: task
          });
        })
        fbTasks.on('child_removed', (result) => {        
          let task = {}
          task[result.key] = result.val()
          dispatch({
            type: 'REMOVED_TASK',
            task: task
          });
        })        
      } else if(lnk !== '/tasks' && Object.keys(getState().contactTasks).length  === 0) {
        fbTasks = firebaseApp.database().ref(lnk);
        fbTasks.on('child_added', (result) => {        
          let task = {}
          task[result.key] = result.val()
          dispatch({
            type: 'ADDED_CONTACT_TASK',
            task: task
          });
        }) 
        fbTasks.on('child_changed', (result) => {        
          let task = {}
          task[result.key] = result.val()
          dispatch({
            type: 'CHANGED_CONTACT_TASK',
            task: task
          });
        })
        fbTasks.on('child_removed', (result) => {        
          let task = {}
          task[result.key] = result.val()
          dispatch({
            type: 'REMOVED_CONTACT_TASK',
            task: task
          });
        })        
      }
    }
  }    
}

function removeTask(task) {
  return (dispatch, getState) => {
    let db = firebaseApp.database().ref();
    let taskRemove = {}
    taskRemove['tasks/'+task.key] = null
    if(task.associatedTo)
      taskRemove['contact-tasks/'+task.associatedTo.key+'/'+task.key] = null
    db.update(taskRemove).then((data) => {
      dispatch({
        type: 'OPEN_SNACK',
        message: "Tarea eliminada!"
      })
      let user = getState().auth
      delete user['status']
      delete user['token']
      task['dropped'] = {by: user, time: Firebase.database.ServerValue.TIMESTAMP, type: 'task'}
      firebaseApp.database().ref('trash/'+getState().auth.uid+'/'+task.key).set(task)
      .catch(error => {
      console.log("Error removing task: ", error);
    });
    })
    .catch(error => {
      console.log("Error removing task: ", error);
    });

  }
}

function change(task) {
  return (dispatch, getState) => {
    dispatch({
      type: 'READ_TASK',
      task: task
    })
  }
}

export {
  create,
  fetchAllTasks,
  removeTask,
  change,
  update
}
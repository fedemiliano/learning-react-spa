import { createStore, applyMiddleware, combineReducers, componse} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import contactsReducer from '../reducers/contacts';
import contactReducer from '../reducers/contact';
import usersReducer from '../reducers/users';
import snackReducer from '../reducers/snack';
import dialogTaskReducer from '../reducers/dialogTask';
import dialogErrorReducer from '../reducers/dialogError';
import taskReducer from '../reducers/task';
import tasksReducer from '../reducers/tasks';
import contactTasksReducer from '../reducers/contactTasks';
import trashReducer from '../reducers/trash';
import eventsReducer from '../reducers/events';
import initialState from './initialState';
import { routerReducer/*, routerMiddleware*/ } from 'react-router-redux'

let reducers = {
      contacts: contactsReducer,
      contact: contactReducer,
      users: usersReducer,
      auth: authReducer,
      snack: snackReducer,
      dialogTask: dialogTaskReducer,
      dialogError: dialogErrorReducer,
      task: taskReducer,
      tasks: tasksReducer,
      contactTasks: contactTasksReducer,
      trash: trashReducer,
      events: eventsReducer,
      routing: routerReducer             
    }

let store

const middlewares = [thunk /*, routerMiddleware(browserHistory)*/]

const appReducer = combineReducers(reducers) 

const rootReducer = (state, action) => {
  console.log("rootReducer")
  console.log(action)
  console.log(state)
  if (action.type === 'RESTORE') {
    state = initialState
  } 
  return appReducer(state, action)
}

if(process.env.NODE_ENV === "development") {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || componse;
  store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
} else {
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )  
}

export default store




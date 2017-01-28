import { createStore, applyMiddleware, combineReducers, componse} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import contactsReducer from '../reducers/contacts';
import contactReducer from '../reducers/contact';
import usersReducer from '../reducers/users';
import messagesReducer from '../reducers/messages';
import snackReducer from '../reducers/snack';
import dialogTaskReducer from '../reducers/dialogTask';
import dialogErrorReducer from '../reducers/dialogError';
import taskReducer from '../reducers/task';
import tasksReducer from '../reducers/tasks';
import contactTasksReducer from '../reducers/contactTasks';
import trashReducer from '../reducers/trash';
import initialState from './initialState';
import { routerReducer } from 'react-router-redux'


let reducers = {
      contacts: contactsReducer,
      contact: contactReducer,
      users: usersReducer,
      auth: authReducer,
      messages: messagesReducer,
      snack: snackReducer,
      dialogTask: dialogTaskReducer,
      dialogError: dialogErrorReducer,
      task: taskReducer,
      tasks: tasksReducer,
      contactTasks: contactTasksReducer,
      trash: trashReducer,
      routing: routerReducer             
    }

console.log(process.env.NODE_ENV)

let store

if(process.env.NODE_ENV === "development") {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || componse;
  store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )
} else {
  store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk)
  )  
}

export default store




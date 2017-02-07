import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './flexboxgrid.css';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import * as actions from './actions/auth';
import store from './store';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import LogoutPage from './components/auth/LogoutPage';
import RegisterPage from './components/auth/RegisterPage';
import ContactsPage from './components/contacts/ContactsPage';
import ContactCreate from './components/contacts/ContactCreate';
import ContactUpdate from './components/contacts/ContactUpdate';
import ContactPage from './components/contacts/ContactPage';
import UsersPage from './components/users/UsersPage';
import TasksPage from './components/tasks/TasksPage';
import TrashPage from './components/trash/TrashPage';

import {syncHistoryWithStore} from 'react-router-redux'

store.dispatch(actions.startListeningToAuth());

const history = syncHistoryWithStore(browserHistory, store)

console.log(history)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={HomePage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/dashboard" component={App}>
        <Route path="/logout" component={LogoutPage}/>
        <Route path="/contacts" component={ContactsPage}/>
        <Route path="/contacts/add" component={ContactCreate}/>
        <Route path="/contacts/edit/:contactKey" component={ContactUpdate}/>
        <Route path="/contacts/:contactKey" component={ContactPage}/>
        <Route path="/users" component={UsersPage}/>
        <Route path="/tasks" component={TasksPage}/>
        <Route path="/trash" component={TrashPage}/>
      </Route>
     </Router>  
  </Provider>,
  document.getElementById('root')
);


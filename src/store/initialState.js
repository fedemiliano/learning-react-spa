export const initialState = {
  auth: {
    status: 'ANONYMOUS',
    email: null,
    username: null,
    uid: null,
    token: null,
    alerts: []
  },
  users: {
    data: []
  },
  contacts: {},
  contact: {},
  snack: {
    open: false,
    message: ""
  },
  dialogTask: {
    open: false,
    title: '',
    operation: null,
    associatedTo: null
  }, 
  dialogError: {
    open: false,
    message: ''
  }, 
  tasks: {},
  contactTasks: {},
  task: {},  
  trash: {},
  messages: {
    key: null,
    toUsername: null,
    toOnline: null,
    toUid: null,
    toVisiting: false,
    data: []
  }
};
export const initialState = {
  auth: {
    status: 'ANONYMOUS',
    email: null,
    username: null,
    uid: null,
    token: null,
    alerts: []
  },
  users: {},
  contacts: {},
  contact: {},
  snack: {
    open: false,
    message: "",
    data: {},
    items: {}
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
  events:{}
};
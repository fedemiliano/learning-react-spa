import firebase from 'firebase';
import * as configDev from './config.dev'
import * as configProd from './config.prod'

export const firebaseApp = firebase.initializeApp(
                            process.env.NODE_ENV === 'development' ? 
                            configDev.firebaseConfig :
                            configProd.firebaseConfig);

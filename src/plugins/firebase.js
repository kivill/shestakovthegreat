import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// firebase init goes here

const config = {
    apiKey: "AIzaSyCWQW_HhJFLg1Z2DjEmqQyhzsKrtPXJtK8",
    authDomain: "shestakovthegreat-7f68a.firebaseapp.com",
    databaseURL: "https://shestakovthegreat-7f68a.firebaseio.com",
    projectId: "shestakovthegreat-7f68a",
    storageBucket: "shestakovthegreat-7f68a.appspot.com",
    messagingSenderId: "490306892656",
    appId: "1:490306892656:web:44eb209a8db9f3b50895b5",
    measurementId: "G-P3T49G5XDB"
  };
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()

export {
    db,
    storage,
    auth,
}
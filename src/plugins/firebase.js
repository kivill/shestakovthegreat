import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyBAphdnWThNB5RJvZ36tmeRk8T90myczws",
    authDomain: "shestakovthegreat.firebaseapp.com",
    databaseURL: "https://shestakovthegreat.firebaseio.com",
    projectId: "shestakovthegreat",
    storageBucket: "shestakovthegreat.appspot.com",
    messagingSenderId: "468456982261",
    appId: "1:468456982261:web:5bf12e85ce6b697ab2a7bc",
    measurementId: "G-SGVWJ7Y160"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()

export {
    db
}
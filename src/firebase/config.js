import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCR7va4fDp1vFeMaYbRKXg03iOzzYAoHUk",
    authDomain: "ddapp-e3389.firebaseapp.com",
    projectId: "ddapp-e3389",
    storageBucket: "ddapp-e3389.appspot.com",
    messagingSenderId: "81508684530",
    appId: "1:81508684530:web:e07e8d90072ec63236766b"
  };

const app = firebase.initializeApp(config);
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const SignInWithFirebase = () =>{
  firebase.auth().signInWithPopup(GoogleAuthProvider)
  .then((result)=>{
    console.log(result.user.displayName)
    return result;
  })
  .catch((err)=>{
    console.log(err)
  })
}
export const LogoutWithFirebase = () =>{
  firebase.auth().signOut();
  console.log("logged out")
}

export default firebase;
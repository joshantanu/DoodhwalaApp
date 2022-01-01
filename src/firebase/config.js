import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCR7va4fDp1vFeMaYbRKXg03iOzzYAoHUk",
    authDomain: "ddapp-e3389.firebaseapp.com",
    projectId: "ddapp-e3389",
    storageBucket: "ddapp-e3389.appspot.com",
    messagingSenderId: "81508684530",
    appId: "1:81508684530:web:e07e8d90072ec63236766b"
  };

//firebase.initializeApp(config);

const app = firebase.initializeApp(config);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore(app);

// const provider = new firebase.auth.GoogleAuthProvider();

// provider.setCustomParameters({prompt: 'select_account'});

// export const signInWithGoogle = () => auth.signInWithPopup(provider);
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
}

// //const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

export default firebase;
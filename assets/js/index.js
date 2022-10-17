import  *  as importSetup  from './class/SetupFirebase.js'

const loginButtonEl = document.querySelector('#loginButton')
let UserLogado = ''

document.addEventListener('DOMContentLoaded', function(e){
  console.log('carregado' , e)
  // Your web app's Firebase configuration
  
  loginButtonEl.addEventListener('click' , (e) => {

    loginPersistentGoogle()
    resolveLogin()
    
  })

  function loginPersistentGoogle(){
    const auth = importSetup.getAuth();
    importSetup.signInWithPopup(importSetup.auth, importSetup.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = importSetup.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      sessionStorage.setItem( "uid", user.uid)
      sessionStorage.setItem( "username", user.displayName)
      sessionStorage.setItem( "email", user.email)
      
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = importSetup.GoogleAuthProvider.credentialFromError(error);
      // ...
    })
  }
  
  function resolveLogin(){
    if (importSetup.auth.currentUser) {
      
      
      window.location = '/logado/dashboard.html'
      
    } else {
      // No user is signed in.
      console.log('deu erro no login');
    }
  }
})





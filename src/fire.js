import firebase from 'firebase'
  var config = {
    apiKey: "AIzaSyASpt6_YuKI-15s2Fcpr4SVpVcT0Iv7EUI",
    authDomain: "advanced-js-ca1.firebaseapp.com",
    databaseURL: "https://advanced-js-ca1.firebaseio.com",
    projectId: "advanced-js-ca1",
    storageBucket: "advanced-js-ca1.appspot.com",
    messagingSenderId: "1010788195926"
  };
  var fire = firebase.initializeApp(config);
  export default fire;

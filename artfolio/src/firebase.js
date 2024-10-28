import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDVpExWDf-UTZa_U3rJyluIUHN6ILZuPAg",
    authDomain: "artfolio-a29ae.firebaseapp.com",
    projectId: "artfolio-a29ae",
    storageBucket: "artfolio-a29ae.appspot.com",
    messagingSenderId: "347927746723",
    appId: "1:347927746723:web:6a487bd4322f3996404716"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

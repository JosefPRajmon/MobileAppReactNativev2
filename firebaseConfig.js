import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    //apiKey: 'api-key',
    //authDomain: 'project-id.firebaseapp.com',
    //databaseURL: 'https://project-id.firebaseio.com',
    projectId: '1fdbc5e0-da0f-4cc8-9d61-e17abbdc74ce',
   // storageBucket: 'project-id.appspot.com',
    messagingSenderId: '110346172888',
    //appId: 'app-id',
    //measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

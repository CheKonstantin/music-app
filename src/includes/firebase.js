import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJkFGAvPWGjGhpgTbKwTJjTOUBYr7k_cE',
  authDomain: 'music-558c0.firebaseapp.com',
  projectId: 'music-558c0',
  storageBucket: 'music-558c0.appspot.com',
  messagingSenderId: '1058775439807',
  appId: '1:1058775439807:web:288d78f516019d23caa90a',
};

export default firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};


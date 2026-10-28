import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyClykJEBGZYQPOlgevLPdUrSk0O1PzqWNc',
  authDomain: 'devashish-weds-sonam.firebaseapp.com',
  projectId: 'devashish-weds-sonam',
  storageBucket: 'devashish-weds-sonam.firebasestorage.app',
  messagingSenderId: '1079731511623',
  appId: '1:1079731511623:web:888a003a29ceefb0f7ec62',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCctoUQV99aYWo86KWNKtVMGajoAEvNCzo',
  authDomain: 'turnos-app-d94db.firebaseapp.com',
  projectId: 'turnos-app-d94db',
  storageBucket: 'turnos-app-d94db.firebasestorage.app',
  messagingSenderId: '678531652269',
  appId: '1:678531652269:web:89e91b89edae9164b0c424',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

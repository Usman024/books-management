import { getFirestore, collection } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VUE_APP_F_API_KEY,
  authDomain: import.meta.env.VUE_APP_AUTH_DOMAIN,
  projectId: 'book-management-df0b3',
  storageBucket: import.meta.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: '44741159937',
  appId: '1:44741159937:web:de7c8612ebc0093989e400'
})

const db = getFirestore(firebaseApp)

export const booksRef = collection(db, 'books')
export const categoriesRef = collection(db, 'categories')
export default db

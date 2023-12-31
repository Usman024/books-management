import { defineStore } from 'pinia'
import db, { booksRef } from '@/database/db'
import { useCollection, useDocument } from 'vuefire'
import { collection, where, query, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'

export const useBookStore = defineStore('books', {
  state: () => ({
    books: [] as any,
    book: null as any,
    collectionName: 'books'
  }),
  getters: {
    useBooks(state) {
      return state.books
    },
    useBook(state) {
      return state.book
    }
  },
  actions: {
    async getBooks(category: string = '') {
      if (!!category)
        this.books = useCollection(
          query(
            collection(db, this.collectionName),
            where('categories', 'array-contains', category ?? '')
          )
        )
      else this.books = useCollection(query(collection(db, this.collectionName)))
    },

    getBook(id: string = '') {
      this.book = useDocument(doc(db, this.collectionName, id))
    },

    updateBook(book: any, id: string) {
      const docRef = doc(db, this.collectionName, id)
      updateDoc(docRef, book)
    },

    deleteBook(id: string = '') {
      deleteDoc(doc(db, this.collectionName, id))
    },
    createBook(body: any = null) {
      const res = addDoc(booksRef, body)
      return res
    }
  }
})

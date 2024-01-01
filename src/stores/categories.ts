import { defineStore } from 'pinia'
import db, { categoriesRef } from '@/database/db'
import { useCollection, useDocument } from 'vuefire'
import { collection, where, query, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as any,
    category: null as any,
    collectionName: 'categories'
  }),
  getters: {
    useCategories(state) {
      return state.categories
    },
    useCategory(state) {
      return state.category
    }
  },
  actions: {
    getCategories() {
      this.categories = useCollection(query(collection(db, this.collectionName)))
    },

    getCategory(id: string = '') {
      const res = useDocument(doc(db, this.collectionName, id))
      this.category = res
    },

    updateCategory(category: any = '', id: string = '') {
      const docRef = doc(db, this.collectionName, id)
      updateDoc(docRef, category)
    },

    deleteCategory(id: string = '') {
      deleteDoc(doc(db, this.collectionName, id))
    },

    createCategories(body: any = null) {
      addDoc(categoriesRef, body.value)
    }
  }
})

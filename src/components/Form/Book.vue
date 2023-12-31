<script setup lang="ts">
import db, { categoriesRef } from '@/database/db'
import { watch, ref, computed } from 'vue'
import { useCollection } from 'vuefire'
import { doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import FormCategory from '@/components/Form/Category.vue'
import { useResponseStore } from '@/stores/response'
import { type category } from '@/types/book'
import { useBookStore } from '@/stores/books'

const emits = defineEmits(['@closeStore'])
const props = defineProps({
  editData: { type: Object, default: null }
})

const bookStore = useBookStore()
const dialog = ref(false)
const categories = useCollection(categoriesRef)
const selectedCategories = ref([])
const isFormValid = ref(true)
const btnLoading = ref(false)
const router = useRouter()
const store = useResponseStore()

const formBook = ref({
  title: {
    type: 'string',
    value: '',
    label: 'Book Title',
    placeholder: 'Enter Book Title',
    rules: [
      (value: string) => {
        if (value) return true
        return 'You must enter a book Title.'
      },

      (value: string) => {
        if (value.length >= 3) return true
        return 'Title should must be three or more characters.'
      }
    ],
    valid: false
  },
  description: {
    value: '',
    label: 'Book Description (Optional but preferred)',
    placeholder: 'Enter Book Description',
    rules: [
      (value: string) => {
        if (value) return true
        return 'You must enter a book description.'
      },

      (value: string) => {
        if (value.length >= 15) return true
        return 'Description should must be fifteen or more characters.'
      }
    ],
    valid: false
  } as any,
  pages: {
    type: 'number',
    value: '',
    label: 'No. of Pages',
    placeholder: 'Enter number of pages in the book',
    valid: false,
    rules: [
      (value: number) => {
        if (value) return true
        return 'You must enter number of pages in book.'
      },

      (value: number) => {
        if (value >= 1) return true
        return 'Book should have minimum 1 page.'
      }
    ]
  },
  author: {
    type: 'string',
    value: '',
    label: 'Author',
    placeholder: 'Enter Author Name',
    valid: false,
    rules: [
      (value: string) => {
        if (value) return true
        return 'You must enter a author name.'
      },

      (value: string) => {
        if (value.length >= 3) return true
        return 'Name should must be three or more characters.'
      }
    ]
  },
  language: {
    type: 'string',
    value: '',
    label: 'Language',
    placeholder: 'Language',
    valid: false,
    rules: [
      (value: string) => {
        if (value) return true
        return 'You must enter a book Language.'
      },

      (value: string) => {
        if (value.length >= 3) return true
        return 'Language should must be three or more characters.'
      }
    ]
  },
  price: {
    type: 'number',
    value: '',
    label: 'Price',
    placeholder: 'Enter Book Price',
    valid: false,
    rules: [
      (value: number) => {
        if (value) return true
        return 'You must enter number of pages in book.'
      },

      (value: number) => {
        if (value >= 10) return true
        return 'Price should must be $10 or more.'
      }
    ]
  },
  sold: {
    type: 'number',
    value: 0,
    label: 'Sold Books',
    placeholder: 'Enter Sold Book',
    valid: false,
    rules: [
      (value: number) => {
        if (value != null || value != undefined) return true
        return 'Enter sold books'
      },
      (value: number) => {
        if (value >= 0) return true
        return 'Sold books cannot be less than zero'
      }
    ]
  }
})

const categoryRules = ref([
  (value: Array<string>) => {
    if (value.length) {
      return true
    }
    return 'Must Select One Categoy'
  }
])

const categoriesArray = computed(() => {
  let arr: any = []
  categories.value.forEach((category: any) => {
    arr.push({
      title: category.name,
      value: category
    })
  })
  return arr
})

const body = computed(() => {
  let categoriesRefArray = selectedCategories.value.map((category: category) => {
    const singleCollectionRef = doc(db, `categories/${category.id}`)
    return singleCollectionRef
  })

  return {
    title: formBook.value.title.value,
    author: formBook.value.author.value,
    price: formBook.value.price.value,
    language: formBook.value.language.value,
    pages: formBook.value.pages.value,
    description: formBook.value.description.value,
    sold: formBook.value.sold.value,
    categories: categoriesRefArray
  }
})

function submitForm() {
  if (!isFormValid.value) {
    store.openSnackbar('Fill Form Correctly', 'error')
    return
  }
  btnLoading.value = true

  // call conditional function
  if (!!props.editData) {
    editBook()
  } else {
    createNewBook()
  }
  btnLoading.value = false
}

async function editBook() {
  bookStore.updateBook(body.value, props.editData.id)
  store.openSnackbar('Book Details Updated')
  emits('@closeStore', true)
}

async function createNewBook() {
  const res: any = await bookStore.createBook(body.value)
  store.openSnackbar('New Book Created')
  router.push(`/dashboard/books/${res.id}`)
}

function setFormData(editData: any) {
  formBook.value.title.value = editData?.title ?? ''
  formBook.value.author.value = editData?.author ?? ''
  formBook.value.description.value = editData?.description ?? ''
  formBook.value.pages.value = editData?.pages ?? 0
  formBook.value.price.value = editData?.price ?? 0
  formBook.value.language.value = editData?.language ?? ''
  formBook.value.sold.value = editData?.sold ?? 0
  selectedCategories.value = editData.categories ?? []
}

watch(
  () => props.editData,
  (newValue, oldValue) => {
    if (newValue != null) {
      setFormData(newValue)
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div>
    <p class="text-primary text-2xl font-semibold mb-4">{{ editData ? 'Edit' : 'Create' }} Book</p>
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-row class="mt-4">
        <v-col cols="12" sm="4">
          <InputField
            class="w-100"
            :placeholder="formBook.title.placeholder"
            :label="formBook.title.label"
            v-model="formBook.title.value"
            :rules="formBook.title.rules"
            :type="formBook.title.type"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12" sm="4">
          <InputField
            class="w-100"
            :placeholder="formBook.author.placeholder"
            :label="formBook.author.label"
            v-model="formBook.author.value"
            :rules="formBook.author.rules"
            :type="formBook.author.type"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <InputField
            class="w-100"
            :placeholder="formBook.language.placeholder"
            :label="formBook.language.label"
            v-model="formBook.language.value"
            :rules="formBook.language.rules"
            :type="formBook.language.type"
          />
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12" sm="6">
          <InputField
            class="w-100"
            :placeholder="formBook.price.placeholder"
            :label="formBook.price.label"
            v-model="formBook.price.value"
            :rules="formBook.price.rules"
            :type="formBook.price.type"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12" sm="6">
          <InputField
            class="w-100"
            :placeholder="formBook.pages.placeholder"
            :label="formBook.pages.label"
            v-model="formBook.pages.value"
            :rules="formBook.pages.rules"
            :type="formBook.pages.type"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="16">
          <VSelect
            base-color="primary"
            chips
            bg-color="transparent"
            variant="outlined"
            :label="'Select Categories'"
            multiple
            v-model="selectedCategories"
            :items="categoriesArray"
            closable-chips
            item-color="primary"
            :rules="categoryRules"
          />
          <v-row class="d-flex justify-end mb-8">
            <v-btn
              @click="dialog = true"
              color="orange-lighten-2"
              size="small"
              prepend-icon="mdi-plus"
              class="text-white"
              >Category</v-btn
            >
          </v-row>

          <InputField
            class="mt-4"
            :placeholder="formBook.sold.placeholder"
            :label="formBook.sold.label"
            v-model="formBook.sold.value"
            :rules="formBook.sold.rules"
            :type="formBook.sold.type"
            validate-on-blur
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            :placeholder="formBook.description.placeholder"
            v-model="formBook.description.value"
            :label="formBook.description.label"
            bg-color="transparent"
            validate-on="blur"
            variant="outlined"
            row-height="50"
            clearable
          ></v-textarea>
        </v-col>
      </v-row>

      <v-btn
        :loading="btnLoading"
        variant="elevated"
        color="primary"
        type="submit"
        block
        size="large"
        class="mt-2"
      >
        {{ editData ? 'Update' : 'Create' }} Book
      </v-btn>
    </v-form>
    <v-dialog transition="dialog-bottom-transition" scrollable v-model="dialog" width="400">
      <div class="pa-4 pa-sm-8 bg-white rounded h-100 scroll">
        <FormCategory @@close-store="dialog = false" />
      </div>
    </v-dialog>
  </div>
</template>

<style scoped></style>

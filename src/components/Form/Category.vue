<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import db, { categoriesRef } from '@/database/db'
import { addDoc, updateDoc, doc } from 'firebase/firestore'
import { useResponseStore } from '@/stores/response'

const props = defineProps({
  editData: { type: Object, default: null }
})
const emits = defineEmits(['@closeStore'])

const store = useResponseStore()
const btnLoading = ref(false)
const isFormValid = ref(true)

const formBook = ref({
  name: {
    type: 'string',
    value: '',
    label: 'Category Name',
    placeholder: 'Enter Category Name',
    rules: [
      (value: string) => {
        if (value) return true
        return 'You must enter a Category Name.'
      },

      (value: string) => {
        if (value.length >= 3) return true
        return 'Category Name should must be three or more characters.'
      }
    ],
    valid: false
  }
})

const body = computed(() => {
  return {
    name: formBook.value.name.value
  }
})

function submitForm() {
  if (!isFormValid.value) return
  btnLoading.value = true

  // call conditional function
  if (!!props.editData) {
    editCategoy()
  } else {
    createCategory()
  }
  btnLoading.value = false
}

async function editCategoy() {
  console.log('edit book')

  const docRef = doc(db, 'categories', props.editData.id)
  await updateDoc(docRef, body.value)
  store.openSnackbar('Cateogry Updated Successfully')
  emits('@closeStore', true)
}

async function createCategory() {
  console.log('new book')
  const res = await addDoc(categoriesRef, body.value)
  emits('@closeStore', true)
  store.openSnackbar('New Category Created')
}

function setFormData(editData: any) {
  formBook.value.name.value = editData?.name ?? ''
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
    <p class="text-primary text-2xl font-semibold mb-4">
      {{ editData ? 'Edit' : 'Create' }} Category
    </p>

    <v-form validate-on="submit" v-model="isFormValid" @submit.prevent="submitForm">
      <InputField
        autofocus
        class="w-100"
        :placeholder="formBook.name.placeholder"
        :label="formBook.name.label"
        v-model="formBook.name.value"
        :rules="formBook.name.rules"
        :type="formBook.name.type"
        validate-on-blur
      />
      <v-btn
        :loading="btnLoading"
        variant="elevated"
        color="primary"
        type="submit"
        block
        size="large"
        class="mt-2"
      >
        {{ editData ? 'Update' : 'Create' }} Category
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped></style>

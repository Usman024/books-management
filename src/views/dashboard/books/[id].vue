<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BookCard from '@/components/Book/Card.vue'
import FormBook from '@/components/Form/Book.vue'
import { useBookStore } from '@/stores/books'
import { onMounted } from 'vue'

const bookStore = useBookStore()
const route = useRoute()
const dialog = ref(false)

const id: any = computed(() => {
  return route.params.id
})

const book = computed(() => {
  return bookStore.useBook
})

onMounted(async () => {
  await bookStore.getBook(id.value)
})
</script>

<template>
  <div class="pb-16">
    <div class="d-flex justify-end mb-10">
      <v-btn prepend-icon="mdi-pencil" color="primary" @click="dialog = true"> Edit Book </v-btn>
    </div>

    <v-dialog transition="dialog-bottom-transition" scrollable v-model="dialog" width="800">
      <div class="pa-4 pa-sm-8 bg-white rounded h-100 scroll">
        <FormBook @@closeStore="dialog = false" :editData="book" />
      </div>
    </v-dialog>
    <BookCard :book="book" />
  </div>
</template>

<style scoped>
.scroll {
  overflow: scroll;
}
.scroll {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.scroll::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>

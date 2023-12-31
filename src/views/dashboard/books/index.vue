<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FormBook from '@/components/Form/Book.vue'
import BookTable from '@/components/Book/Table.vue'
import SvgNotFound from '@/components/Svg/NotFound.vue'
import { useBookStore } from '@/stores/books'

const bookStore = useBookStore()
const dialog = ref(false)
const route = useRoute()
const category: any = computed(() => {
  return route.query.category
})

const books = computed(() => {
  return bookStore.useBooks
})
watch(
  () => category.value,
  (newValue) => {
    bookStore.getBooks(newValue)
  },
  { deep: true, immediate: true }
)

onMounted(async () => {
  await bookStore.getBooks()
})
</script>

<template>
  <div>
    <div>
      <div class="d-flex justify-end mb-10">
        <v-btn prepend-icon="mdi-bookshelf" color="primary" @click="dialog = true">
          Create Book
        </v-btn>
      </div>

      <v-dialog transition="dialog-bottom-transition" scrollable v-model="dialog" width="800">
        <div class="pa-4 pa-sm-8 bg-white rounded h-100 scroll">
          <FormBook @@closeStore="dialog = false" />
        </div>
      </v-dialog>
    </div>

    <!-- <v-skeleton-loader v-if="loading" :loading="true" type="table"></v-skeleton-loader> -->

    <BookTable v-if="books.length" :books="books" />

    <div class="d-flex justify-center items-center" v-else-if="!books.length">
      <EmptyState :heading="'No Book Found'">
        <SvgNotFound class="svgWidth" />
      </EmptyState>
    </div>
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

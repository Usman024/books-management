<script setup lang="ts">
import { type PropType } from 'vue'
import { useBookStore } from '@/stores/books'
import { useResponseStore } from '@/stores/response'

const responseStore = useResponseStore()
const bookStore = useBookStore()
const props = defineProps({
  books: { type: Array as PropType<any>, default: [] }
})

async function deleteBook(id: string) {
  responseStore.openDialog(
    'Delete Book',
    'Are you sure you want to delte this book? This action cannot be undone',
    () => {
      bookStore.deleteBook(id)
    },
    'Delete',
    true
  )
}
</script>

<template>
  <div class="pb-16 border rounded-md">
    <v-table>
      <thead>
        <tr>
          <th class="text-left text-lg">No.</th>
          <th class="text-left text-lg">Author</th>
          <th class="text-left text-lg">Title</th>
          <th class="text-left text-lg">Languge</th>
          <th class="text-left text-lg">Price</th>
          <th class="text-left text-lg">Pages</th>
          <th class="text-left text-lg">
            <v-icon icon="mdi-gesture-tap-button" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, i) in books" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ book?.author ?? '' }}</td>
          <td>{{ book?.title ?? '' }}</td>
          <td>{{ book?.language ?? '' }}</td>
          <td>{{ book?.price ?? '' }}</td>
          <td>{{ book?.pages ?? '' }}</td>
          <td>
            <router-link :to="`/dashboard/books/${book?.id ?? ''}`">
              <v-icon icon="mdi-eye" />
            </router-link>
            <v-icon icon="mdi-delete-empty" class="ml-4" @click="deleteBook(book?.id ?? '')" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <!-- <BookCard :book="book" /> -->
  </div>
</template>

<style scoped>
.svgWidth {
  width: 300px;
}
</style>

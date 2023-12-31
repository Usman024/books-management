<script setup lang="ts">
import { useRouter } from 'vue-router'
import SvgNotFound from '@/components/Svg/NotFound.vue'
import { useCategoryStore } from '@/stores/categories'
import { computed, onMounted } from 'vue'
import { useResponseStore } from '@/stores/response'

const emits = defineEmits(['editCategoryData'])

const responseStore = useResponseStore()
const categoriesStore = useCategoryStore()
const router = useRouter()

const categories = computed(() => {
  return categoriesStore.useCategories
})

async function deleteCategory(id: string) {
  responseStore.openDialog(
    'Delete Book',
    'Are you sure you want to delte this book? This action cannot be undone',
    () => {
      categoriesStore.deleteCategory(id)
    },
    'Delete',
    true
  )
}

function booksInCategory(name: string) {
  router.push(`/dashboard/books?category=${name}`)
}

onMounted(() => {
  categoriesStore.getCategories()
})
</script>

<template>
  <div class="pb-5 border rounded-md" v-if="categories.length">
    <v-table>
      <thead>
        <tr>
          <th class="text-left text-lg">No.</th>
          <th class="text-left text-lg">Name</th>
          <th class="text-left text-lg">Id</th>

          <th class="text-left text-lg">
            <v-icon icon="mdi-gesture-tap-button" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, i) in categories" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ category?.name ?? '' }}</td>
          <td>{{ category?.id ?? '' }}</td>
          <td>
            <v-icon
              icon="mdi-pencil"
              class="text-primary"
              @click="emits('editCategoryData', category)"
            />
            <v-icon
              icon="mdi-eye"
              class="text-primary ml-4"
              @click="booksInCategory(category.name)"
            />
            <v-icon
              icon="mdi-delete-empty"
              class="ml-4 text-primary"
              @click="deleteCategory(category?.id ?? '')"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="d-flex justify-center items-center" v-else>
    <EmptyState :heading="'No Category Found'">
      <SvgNotFound class="svgWidth" />
    </EmptyState>
  </div>
</template>

<style scoped></style>

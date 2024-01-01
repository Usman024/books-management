<script setup lang="ts">
import { ref } from 'vue'
import CategoriesTable from '@/components/Category/Table.vue'
import FormCategory from '@/components/Form/Category.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'

const dialog = ref(false)
const categoryDataToEdit: any = ref(null)
const categoriesStore = useCategoryStore()

onMounted(() => {
  categoriesStore.getCategories()
})
</script>

<template>
  <div class="pb-10">
    <div class="text-center">
      <div class="d-flex justify-end mb-10">
        <v-btn prepend-icon="mdi-camera-rear" color="primary" @click="dialog = true">
          Create Category
        </v-btn>
      </div>

      <v-dialog
        @click:outside="categoryDataToEdit = null"
        transition="dialog-bottom-transition"
        scrollable
        v-model="dialog"
        width="400"
      >
        <div class="pa-4 pa-sm-8 bg-white rounded h-100 scroll">
          <FormCategory
            @@closeStore="(dialog = false), (categoryDataToEdit = null)"
            :editData="categoryDataToEdit"
          />
        </div>
      </v-dialog>
    </div>
    <CategoriesTable @editCategoryData="(categoryDataToEdit = $event), (dialog = true)" />
  </div>
</template>

<style lang="scss" scoped></style>
@/stores/categories

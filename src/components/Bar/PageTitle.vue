<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const category = computed(() => {
  return route.query.category
})

const currentPage = computed(() => {
  const details = {
    title: '',
    icon: ''
  }
  if (route.name == 'dashboard') {
    details.title = 'Dashboard'
    details.icon = 'mdi-laptop'
  } else if (route.name == 'books') {
    details.title = `${category.value ?? ''} Books`
    details.icon = 'mdi-bookshelf'
  } else if (route.name == 'book') {
    details.title = 'Book Details'
    details.icon = 'mdi-book-multiple'
  } else if (route.name == 'categories') {
    details.title = 'Categories'
    details.icon = 'mdi-shape-plus'
  } else if (route.name == 'category') {
    details.title = 'Category Details'
    details.icon = 'mdi-shape'
  }
  return details
})
</script>

<template>
  <div class="mb-8 d-flex gap-3 items-center">
    <p class="text-4xl font-semibold text-primary">{{ currentPage.title }}</p>
    <v-icon class="text-primary" :icon="currentPage.icon" />
  </div>
</template>

<style scoped></style>

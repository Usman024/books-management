<script lang="ts" setup>
import { ref } from 'vue'
const navLinks = ref([
  { label: 'Books', path: '/dashboard/books', icon: 'mdi-bookshelf' },
  { label: 'Categories', path: '/dashboard/categories', icon: 'mdi-camera-rear' }
])
</script>

<template>
  <div class="mb-16">
    <section class="bg-primary py-4 px-4 d-flex justify-between">
      <router-link to="/dashboard" class="font-bold text-xl">Book's Management System</router-link>

      <article class="d-flex gap-4">
        <router-link
          :to="link.path"
          class="text-lg font-semibold"
          v-for="(link, i) of navLinks"
          :key="i"
        >
          {{ link.label }}
          <component :is="link.icon" />
          <v-icon class="text-white" :icon="link.icon" />
        </router-link>
      </article>
    </section>
  </div>
</template>

<style scoped></style>

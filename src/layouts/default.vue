<script setup lang="ts">
import Appbar from '@/components/Bar/Appbar.vue'
import PageTitle from '@/components/Bar/PageTitle.vue'
</script>

<template>
  <div>
    <Appbar />
    <section class="px-4 px-sm-8 px-lg-16">
      <PageTitle />

      <slot />
    </section>
  </div>
</template>

<style scoped></style>

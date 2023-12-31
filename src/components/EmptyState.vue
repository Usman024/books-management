<template>
  <div>
    <slot />
    <p class="text-3xl font-semibold text-center mt-8 text-orange-lighten-2">{{ heading }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  heading: { type: String, default: '' }
})
</script>

<style scoped></style>

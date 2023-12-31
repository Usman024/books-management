<template>
  <div>
    <v-snackbar :color="state" v-model="show" timeout="2000">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="black" variant="text" @click="show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResponseStore } from '@/stores/response'

const store = useResponseStore()

const snackbar = computed(() => {
  return store.getSnackbar
})

const show = computed(() => {
  return snackbar.value.show
})

const text = computed(() => {
  return snackbar.value.text
})

const state = computed(() => {
  return snackbar.value.text
})
</script>

<style scoped></style>

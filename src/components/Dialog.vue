<template>
  <div>
    <v-dialog v-model="show" transition="dialog-bottom-transition" width="500">
      <v-card>
        <v-toolbar color="primary" :title="heading"></v-toolbar>
        <v-card-text>
          <div class="text-lg pa-5 border-b">{{ body }}</div>
        </v-card-text>
        <v-card-actions class="justify-end gap-2">
          <v-btn size="large" variant="tonal" @click="store.closeDialog()">Close</v-btn>

          <v-btn
            size="large"
            variant="outlined"
            color="success"
            @click="action(), store.closeDialog()"
            >{{ button }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useResponseStore } from '@/stores/response'
import { computed } from 'vue'

const store = useResponseStore()

const dialog: any = computed(() => {
  return store.getDialog
})

const heading = computed(() => {
  return dialog.value.heading
})

const body = computed(() => {
  return dialog.value.body
})

const button = computed(() => {
  return dialog.value.button
})

const show = computed(() => {
  return dialog.value.show
})

const action = computed(() => {
  return dialog.value.action
})
</script>

<style scoped></style>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import '@/assets/globalStyle.css'
import Snackbar from '@/components/Snackbar.vue'
import Dialog from '@/components/Dialog.vue'

const route = useRoute()
</script>

<template>
  <Vapp>
    <Dialog />
    <Snackbar />
    <component :is="route.meta.layout"> <RouterView /> </component>
  </Vapp>
</template>

<style scoped></style>

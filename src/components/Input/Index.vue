<template>
  <v-text-field
    :label="label"
    :variant="variant"
    :placeholder="placeholder"
    :clearable="clearable"
    :prepend-icon="PrependIcon"
    :prepend-inner-icon="PrependInnerIcon"
    :append-inner-icon="AppendInnerIcon"
    :append-icon="AppendIcon"
    :rules="rules"
    :prefix="prefix"
    :suffix="sufix"
    :validate-on="validateOn"
    :size="size"
  />
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

type variant =
  | 'Solo'
  | 'outlined'
  | 'solo-filled'
  | 'solo-inverted'
  | 'underlined'
  | 'plain'
  | 'undefined'
  | 'filled'

const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rules: { type: Array as PropType<any>, default: [] },
  variant: { type: String as PropType<any | variant>, default: 'outlined' },
  size: { type: String as PropType<any | variant>, default: 'x-large' },
  clearable: { type: Boolean, default: false },
  validateOn: { type: String as PropType<any>, default: 'blur' },
  PrependIcon: { type: Object as PropType<any>, default: '' },
  PrependInnerIcon: { type: Object as PropType<any>, default: '' },
  AppendInnerIcon: { type: Object as PropType<any>, default: '' },
  AppendIcon: { type: Object as PropType<any>, default: '' },
  prefix: { type: String, default: '' },
  sufix: { type: String, default: '' }
})
</script>

<style scoped></style>

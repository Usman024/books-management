<template>
  <div>
    <v-card class="mx-auto" max-width="500">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

      <v-card-title class="text-orange-lighten-2">{{ book?.title ?? '' }} </v-card-title>

      <v-card-subtitle>
        <v-icon icon="mdi-account" class="mt-n1" /> {{ book?.author ?? '' }}
      </v-card-subtitle>

      <div class="d-flex justify-between items-center mt-4">
        <v-card-subtitle class="text-primary">
          <v-icon icon="mdi-ticket-account" /> Sold: {{ book?.sold ?? '' }}
        </v-card-subtitle>

        <v-card-subtitle class="text-end text-primary text-lg">
          ${{ book?.price ?? '' }}
        </v-card-subtitle>
      </div>
      <v-card-actions>
        <v-btn color="primary" variant="text"> Explore </v-btn>

        <v-spacer></v-spacer>

        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text class="text-gray-700">
            Description: {{ book?.description ?? '' }}
          </v-card-text>

          <v-card-text class="text-gray-700">
            Language:
            <span class="text-capitalize text-primary">
              {{ book?.language ?? '' }}
            </span>
          </v-card-text>

          <v-card-text class="text-gray-700 mt-n5">
            Pages:
            <span class="text-capitalize text-primary">
              {{ book?.pages ?? '' }}
            </span>
          </v-card-text>
          <v-card-text class="mt-n6">
            <span class="text-primary text-lg">Categories: (Click to see relevant books)</span>
            <div class="mt-3 flex gap-3 flex-wrap">
              <v-chip
                class="cursor-pointer"
                @click="booksInCategory(category.id)"
                v-for="(category, i) of book?.categories"
                >{{ category?.name }}</v-chip
              >
            </div>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import type { book } from '../../types/book'
import { useRouter } from 'vue-router'
import { ref, type PropType } from 'vue'

const props = defineProps({
  book: { type: Object as PropType<book>, default: null }
})

const router = useRouter()

function booksInCategory(id: string) {
  router.push(`/dashboard/books?categoryId=${id}`)
}

const show = ref(false)
</script>

<style scoped>
.box {
  max-width: 600px;
}
</style>

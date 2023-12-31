<template>
  <!-- <div>
    <p>dashboard hi page</p>
    <article v-if="documents" v-for="doc in documents">
      <p>
        {{ doc.id }}
        {{ doc }}
      </p>
    </article>
  </div>
  <p>CAeasdf</p>

  <article v-if="documents" v-for="doc in categories">
    <p>
      {{ doc }}
    </p>
  </article> -->

  <!-- {{ documents ?? '' }} -->
  <div>Dashboard index</div>
  <p v-for="dd of dds">
    {{ dd }}
  </p>
  <p @click="newData()" class="cursor-pointer">create new ref</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useCollection, useDocument } from 'vuefire'
import { Firestore, addDoc, doc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import db from '@/database/db'

const ddRef = collection(db, 'dd')

function newData() {
  const singleCollectionRef = doc(db, `categories/d1cPcN0n9YJiICYgizKn`)

  const res = addDoc(ddRef, {
    categories: [singleCollectionRef]
  })
}

const dds = useCollection(ddRef)
</script>

<style scoped></style>

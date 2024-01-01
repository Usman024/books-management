<template>
  <div class="pb-36 px-4 sm:px-10 md:px-20">
    <p class="text-2xl font-[lato] font-semibold">Key Concepts used in the project</p>
    <ul class="mt-4">
      <li class="list-decimal">Template Syntax (Text Interpolation)</li>
      <li class="list-decimal">Reactive State (Ref, Computed, Watchers)</li>
      <li class="list-decimal">Vue directives (v-if, v-else, v-else-if,v-for,v-show etc )</li>
      <li class="list-decimal">
        State Management using pinia (Can also be done with vuex or composables)
      </li>
      <li class="list-decimal">Single file component approach</li>
      <li class="list-decimal">Composition api (With setup) instead of options api</li>
      <li class="list-decimal">Template Refs (For getting reference to some element in html)</li>
      <li class="list-decimal">Life-cycle Hooks (onMounted)</li>
      <li class="list-decimal">Form binding</li>
      <li class="list-decimal">Class and style binding</li>
      <li class="list-decimal">Conditional Rendering</li>
      <li class="list-decimal">Props,emits,events, and component-bonding using v-model</li>
      <li class="list-decimal">Slots concept</li>
      <li class="list-decimal">Routing</li>
      <li class="list-decimal">Not used v-html to prevent XXS</li>
    </ul>

    <p class="text-2xl font-[lato] font-semibold mt-8">Things left For GOOD UX</p>
    <ul class="mt-6">
      <li class="list-decimal">
        skeletons for loading <v-skeleton-loader type="text" width="200"></v-skeleton-loader>
      </li>
      <li class="list-decimal">Animations</li>
      <li class="list-decimal">Great Visual designs</li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

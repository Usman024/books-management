import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { firebaseApp } from './database/db'
import InputText from './components/Input/Index.vue'

import NotFound from './components/EmptyState.vue'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireFirestoreOptionsAPI()]
})

app.use(vuetify)

app.use(createPinia())
app.component('InputField', InputText)
app.component('EmptyState', NotFound)
app.component('v-skeleton-loader', VSkeletonLoader)
app.use(router)

app.mount('#app')

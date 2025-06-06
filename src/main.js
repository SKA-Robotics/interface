import vuetify from '@/plugins/vuetify'
import router from '@/router'
import Vue from 'vue'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import App from '@/App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import '@/styles/overrides.scss'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

const app = new Vue({
    router,
    vuetify,
    pinia,
    render: (h) => h(App),
})
app.$mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { createVuetify } from 'vuetify';
// import 'vuetify/styles'; // Import Vuetify styles

import App from './App.vue'
import router from './router'
// const vuetify = createVuetify({
//     defaults: {}, // Khởi tạo mặc định (nếu cần)
//   });

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(vuetify);

app.mount('#app')

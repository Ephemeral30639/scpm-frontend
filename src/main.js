import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'

// const Welcome = "./views/Welcome.vue"

// const routes = [
//     {path: '/welcome', component: Welcome}
// ]

// const router = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes,
// })

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register', 
        component: Register
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
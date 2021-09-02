import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'
import TakenCourses from '../views/TakenCourses.vue'
import Makeup from '../views/Makeup.vue'
import Login from '../views/Login.vue'
import GPCC from '../views/GPCC.vue'
import Suggestion from '../views/courseSuggestion.vue'

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
    },
    {
        path: '/takencourses',
        name: 'TakenCourses',
        component: TakenCourses
    },
    {
        path: '/makeup',
        name: 'Makeup',
        component: Makeup
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/gpcc',
        name: 'GPCC',
        component: GPCC
    },
    {
        path: '/coursesuggestion',
        name: 'CourseSuggestion',
        component: Suggestion
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
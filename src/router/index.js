import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'
import TakenCourses60 from '../views/TakenCourses60.vue'
import Makeup from '../views/Makeup.vue'
import Login from '../views/Login.vue'
import GPCC from '../views/GPCC.vue'
import CourseAdvice from '../views/CourseAdvice.vue'
import CourseComment from '../views/CourseComment.vue'
import Enroll from '../views/Enroll.vue'
import Logout from '../views/Logout.vue'
import EditCourseAdvice from '../views/EditCourseAdvice.vue'
import EditCurrentTrimester from '../views/EditCurrentTrimester.vue'

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
        path: '/takencourses60',
        name: 'TakenCourses60',
        component: TakenCourses60
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
        path: '/courseadvice',
        name: 'CourseAdvice',
        component: CourseAdvice
    },
    {
        path: '/coursecomment',
        name: 'CourseComment',
        component: CourseComment
    },
    {
        path: '/enroll',
        name: 'Enrollment',
        component: Enroll
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/editcourseadvice',
        name: 'EditCourseAdvice',
        component: EditCourseAdvice
    },
    {
        path: '/editcurrenttrimester',
        name: 'EditCurrentTrimester',
        component: EditCurrentTrimester
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
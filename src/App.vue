<template>

  <img alt="Project logo" src="./assets/logo.png" />

  <!-- Top Navigation Bar -->
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">Home</el-menu-item>
    <el-submenu index="2">
      <template #title>Features</template>
      <el-menu-item index="2-1">Course and Credit Tracking</el-menu-item>
      <el-menu-item index="2-2">Course Suggestions</el-menu-item>
      <el-menu-item index="2-3">Generation Per Course Counter</el-menu-item>
      <el-menu-item index="2-4">Makeup Finder</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">Login</el-menu-item>
    <el-menu-item index="4"><a href="/register" target="_blank">Register</a></el-menu-item>
  </el-menu>

  <router-view/>

</template>

<script setup>
import Home from './views/Home.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

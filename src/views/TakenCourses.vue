<template>

<!-- Top Navigation Bar -->
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><a href="/">Home</a></el-menu-item>
  <el-submenu index="2">
    <template #title>Features</template>
    <el-menu-item index="2-1">Course and Credit Tracking</el-menu-item>
    <el-menu-item index="2-2">Course Suggestions</el-menu-item>
    <el-menu-item index="2-3">Generation Per Course Counter</el-menu-item>
    <el-menu-item index="2-4">Makeup Finder</el-menu-item>
  </el-submenu>
  <el-menu-item index="3"><a href="/login">Login</a></el-menu-item>
  <el-menu-item index="4"><a href="/register">Register</a></el-menu-item>
</el-menu>

</template>

<script>
export default {
    data() {
      return {
        activeIndex: '2',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

</style>
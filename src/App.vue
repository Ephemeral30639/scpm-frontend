<template>

  <img alt="Project logo" src="./assets/logo.png" />

  <el-menu
    :router="true"
    :default-active="activeLink"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    
    <el-menu-item index="/"><router-link style="text-decoration: none; color: inherit;" to='/'>Home</router-link></el-menu-item>
    
    <el-submenu index="2">
      <template #title>Features</template>
      <el-menu-item index="/takencourses"><router-link style="text-decoration: none; color: inherit;" to='/takencourses'>Course and Credit Tracking</router-link></el-menu-item>
      <el-menu-item index="/coursesuggestion"><router-link style="text-decoration: none; color: inherit;" to='/coursesuggestion'>Course Suggestions</router-link></el-menu-item>
      <el-menu-item index="/gpcc"><router-link style="text-decoration: none; color: inherit;" to='/gpcc'>Generation Per Course Counter</router-link></el-menu-item>
      <el-menu-item index="/makeup"><router-link style="text-decoration: none; color: inherit;" to='/makeup'>Makeup Finder</router-link></el-menu-item>
    </el-submenu>
    
    <el-menu-item index="/enroll"><router-link style="text-decoration: none; color: inherit;" to='/enroll'>Enroll</router-link></el-menu-item>

    <el-submenu index="3">
      <template #title>Login / Logout</template>
      <el-menu-item index="/login"><router-link style="text-decoration: none; color: inherit;" to='/login'>Login</router-link></el-menu-item>
      <el-menu-item index="/logout"><router-link style="text-decoration: none; color: inherit;" to='/logout'>Logout</router-link></el-menu-item> 
    </el-submenu>
    
    <el-menu-item index="/register"><router-link style="text-decoration: none; color: inherit;" to='/register'>Register</router-link></el-menu-item>
  </el-menu>

  <router-view/>
  
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        activeLink: null
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    watch: {
      $route (to, from) {
        this.activeLink = to.path
      }
    },
    mounted: function(){
      this.activeLink = this.$route.path
    }
  }
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

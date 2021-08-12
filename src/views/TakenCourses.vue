<template>

<div>

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

  <br>

  <!-- Collapse -->
  <el-collapse v-model="activeNames" @change="handleChange" style="margin:30px;">
    <el-collapse-item title="Taken Required Courses" name="1">
      <!-- table -->
      <el-table :data="takenRequiredCourses" stripe style="width: 100%; justify-content: space-between;"> 
        <el-table-column prop="ID" label="Course ID" ></el-table-column>
        <el-table-column prop="Name" label="Name" ></el-table-column>
        <el-table-column prop="Credit" label="Credit"></el-table-column>
      </el-table>
      <el-tag :type="success" style="margin-top:25px;">Total Credit Earned: {{totalCreditTable1}}</el-tag>
    </el-collapse-item>
    <el-collapse-item title="Taken Elective Courses" name="2">
      <!-- table -->
      <el-table :data="takenElectiveCourses" stripe style="width: 100%; justify-content: space-between;"> 
        <el-table-column prop="ID" label="Course ID" ></el-table-column>
        <el-table-column prop="Name" label="Name" ></el-table-column>
        <el-table-column prop="Credit" label="Credit"></el-table-column>
      </el-table>
      <el-tag :type="success" style="margin-top:25px;">Total Credit Earned: {{totalCreditTable2}}</el-tag>
    </el-collapse-item>
  </el-collapse>

</div>

</template>

<script>
import axios from 'axios'
import cors from 'cors'
export default {
    data() {
      return {
        activeIndex: '2',
        takenRequiredCourses:[],
        takenElectiveCourses:[],
        totalCreditTable1: 0,
        totalCreditTable2: 0
      };
    },

    mounted() {

      axios.get('http://localhost:5000/taken-courses',cors())
            .then((res) => {
            console.log(res.data)

            //filter JSON data
            this.takenRequiredCourses = res.data.filter(course => course.Category =="Required Major Courses")

            this.takenElectiveCourses = res.data.filter(course => course.Category =="Elective Major Courses")

            //sum JSON object keys
            this.totalCreditTable1 = this.takenRequiredCourses.map(takenRequiredCourses => takenRequiredCourses.Credit).reduce((total, takenRequiredCourses) => takenRequiredCourses + total)

            this.totalCreditTable2 = this.takenElectiveCourses.map(takenElectiveCourses => takenElectiveCourses.Credit).reduce((total, takenElectiveCourses) => takenElectiveCourses + total)

            console.log(this.totalCreditTable1)
            console.log(this.totalCreditTable2)


            })
            .catch((err) => {
            console.log(err)
            })
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
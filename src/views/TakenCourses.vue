<template>

<div>
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
      // Allow cookie to pass through CORS with " {withCredentials: true} ". Without this, there will either be CORS error or the backend will not be able to identy the
      // logged in session since no cookies was pass if we don't put " {withCredentials: true} ". This was the reason why "req.user.studentID" in backend was "undefined".
      // No cookies was send to the backend to identify the logged in user.
      axios.get('http://localhost:5000/taken-courses', {withCredentials: true})
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
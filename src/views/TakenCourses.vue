<template>

<div v-loading="loading">
  <br>
  <!-- Collapse -->
  <el-collapse v-model="activeNames" @change="handleChange" style="margin:30px;">


      <!-- To make our code cleaner and easier to debug, we are turning big chunk of repetitve code into a component. -->
      <!-- To see where the original code is, check inside the component folder. -->

      <!-- We are turing from this.... -->

    <!-- <el-collapse-item title="Core Courses" name="1">
      <el-table :data="CoreCourses" stripe style="width: 100%; justify-content: space-between;"> 
        <el-table-column prop="ID" label="Course ID" ></el-table-column>
        <el-table-column prop="Name" label="Name" ></el-table-column>
        <el-table-column prop="Credit" label="Credit"></el-table-column>
      </el-table>
      <el-tag :type="success" style="margin-top:25px;">Total Credit Earned: {{CoreTotalCredit}}</el-tag>
    </el-collapse-item> -->

      <!-- ....to this -->

      <h1>{{user.name}}'s Taken Courses</h1>

      <h2 style="text-align:left;">General Education</h2>

      <TakenCourseTable title="English Communication" name="4" :courses="EnglishCourses" :totalCredit="EnglishTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Natural Sciences" name="5" :courses="NatSciCourses" :totalCredit="NatSciTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Humanities" name="6" :courses="HumanityCourses" :totalCredit="HumanityTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Social Sciences" name="7" :courses="SocialSciCourses" :totalCredit="SocialSciTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Health Science and Physical Education" name="8" :courses="PECourses" :totalCredit="PETotalCredit"></TakenCourseTable>

      <h2 style="text-align:left;">Majour Courses</h2>

      <TakenCourseTable title="Core Courses" name="1" :courses="CoreCourses" :totalCredit="CoreTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Required Major Courses" name="2" :courses="RequiredCourses" :totalCredit="RequiredTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Elective Major Courses" name="3" :courses="ElectiveCourses" :totalCredit="ElectiveTotalCredit"></TakenCourseTable>

  </el-collapse>

</div>

</template>

<script>
import axios from 'axios'
import TakenCourseTable from '../components/TakenCoursesComponent/TakenCourseTable.vue'
export default {
    components: {
      TakenCourseTable
    },
    data() {
      return {
        activeIndex: '2',

        CoreCourses:[],
        RequiredCourses:[],
        ElectiveCourses:[],
        EnglishCourses:[],
        NatSciCourses:[],
        HumanityCourses:[],
        SocialSciCourses:[],
        PECourses:[],

        CoreTotalCredit: 0,
        RequiredTotalCredit: 0,
        ElectiveTotalCredit: 0,
        EnglishTotalCredit: 0,
        NatSciTotalCredit: 0,
        HumanityTotalCredit: 0,
        SocialSciTotalCredit: 0,
        PETotalCredit: 0,

        loading: true,

        user: {
          name: 'Student'
        }
      };
    },

    created() {
      // Allow cookie to pass through CORS with " {withCredentials: true} ". Without this, there will either be CORS error or the backend will not be able to identy the
      // logged in session since no cookies was pass if we don't put " {withCredentials: true} ". This was the reason why "req.user.studentID" in backend was "undefined".
      // No cookies was send to the backend to identify the logged in user.
      axios.get('http://localhost:5000/taken-courses', {withCredentials: true})
            .then((res) => {

            if (res.data == "Not Logged In") {
              alert("You are not logged in. Please log in first.")
              this.$router.push({path: '/login'})
            }

            axios.get('http://localhost:5000/getuser', {withCredentials: true})
            .then((res => {
              this.user.name = res.data.user.firstname
              this.loading = false
            }))

            //filter JSON data
            this.CoreCourses = res.data.filter(course => course.Category =="Core Courses")

            this.RequiredCourses = res.data.filter(course => course.Category =="Required Major Courses")

            this.ElectiveCourses = res.data.filter(course => course.Category =="Elective Major Courses")

            this.EnglishCourses = res.data.filter(course => course.Category =="English Communication")
                  
            this.NatSciCourses = res.data.filter(course => course.Category =="Natural Sciences")
                        
            this.HumanityCourses = res.data.filter(course => course.Category =="Humanities")

            this.SocialSciCourses = res.data.filter(course => course.Category =="Social Sciences")

            this.PECourses = res.data.filter(course => course.Category =="Health Science and Physical Education")

            //sum JSON object keys
            //Fixed reduce empty array by adding initial value ref:https://stackoverflow.com/questions/23359173/javascript-reduce-an-empty-array
            this.CoreTotalCredit = this.CoreCourses.map(CoreCourses => CoreCourses.Credit).reduce((total, CoreCourses) => CoreCourses + total, 0)

            this.RequiredTotalCredit = this.RequiredCourses.map(RequiredCourses => RequiredCourses.Credit).reduce((total, RequiredCourses) => RequiredCourses + total, 0)

            this.ElectiveTotalCredit = this.ElectiveCourses.map(ElectiveCourses => ElectiveCourses.Credit).reduce((total, ElectiveCourses) => ElectiveCourses + total, 0)

            this.EnglishTotalCredit = this.EnglishCourses.map(EnglishCourses => EnglishCourses.Credit).reduce((total, EnglishCourses) => EnglishCourses + total, 0)

            this.NatSciTotalCredit = this.NatSciCourses.map(NatSciCourses => NatSciCourses.Credit).reduce((total, NatSciCourses) => NatSciCourses + total, 0)

            this.HumanityTotalCredit = this.HumanityCourses.map(HumanityCourses => HumanityCourses.Credit).reduce((total, HumanityCourses) => HumanityCourses + total, 0)

            this.SocialSciTotalCredit = this.SocialSciCourses.map(SocialSciCourses => SocialSciCourses.Credit).reduce((total, SocialSciCourses) => SocialSciCourses + total, 0)

            this.PETotalCredit = this.PECourses.map(PECourses => PECourses.Credit).reduce((total, PECourses) => PECourses + total, 0)

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
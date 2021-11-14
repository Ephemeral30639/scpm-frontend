<template>

<div v-loading="loading" v-if="MainCategory.length">

  <br>

  <h1>{{user.name}}'s Taken Courses</h1>

  <!-- Container -->
  <div class="container" style="padding:40px;">

    <!-- Buttons -->
    <el-row v-if="AllTakenCourses.length">
      <TakenCoursesButtonAdd :subcategories="Subcategory"></TakenCoursesButtonAdd>
      <TakenCoursesButtonDelete :TakenCourses="AllTakenCourses" :subcategories="Subcategory"></TakenCoursesButtonDelete>
      <TakenCoursesButtonSearch :AllTakenCourses="AllTakenCourses"></TakenCoursesButtonSearch>
      <TakenCoursesButtonCatalog></TakenCoursesButtonCatalog>
    </el-row>
        
    <br><br>

    <!-- Dashboard -->
    <div v-for="(maincategory, key) in MainCategory" :key= 'key'>
      <el-divider content-position="left"><h2 style="text-align:left;">{{maincategory.name}} ( {{maincategory.obtainedCredit}} out of {{maincategory.totalCredit}} )</h2></el-divider>
      <div class="row align-items-center grid-ish" style="justify-content: space-evenly;">
        <TakenCoursesCard :subCategoryData="subCategoryData" v-for="(subCategoryData, key) in maincategory.subCategoryData" :key= 'key'></TakenCoursesCard>
      </div>
      <br><br><br><br><br>
    </div>

    <!-- Grand total credit -->
    <el-tag style="font-size: 30px;">Grand Total: {{this.MainCategory[0].obtainedCredit + this.MainCategory[1].obtainedCredit + this.MainCategory[2].obtainedCredit}} out of {{this.MainCategory[0].totalCredit + this.MainCategory[1].totalCredit + this.MainCategory[2].totalCredit}}</el-tag>
    
  </div>

</div>

</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import TakenCoursesButtonAdd from '../components/TakenCoursesComponent/TakenCoursesButtons/TakenCoursesButtonAdd.vue'
import TakenCoursesButtonDelete from '../components/TakenCoursesComponent/TakenCoursesButtons/TakenCoursesButtonDelete.vue'
import TakenCoursesButtonSearch from '../components/TakenCoursesComponent/TakenCoursesButtons/TakenCoursesButtonSearch.vue'
import TakenCoursesButtonCatalog from '../components/TakenCoursesComponent/TakenCoursesButtons/TakenCoursesButtonCatalog.vue'
import TakenCoursesCard from '../components/TakenCoursesComponent/TakenCoursesCard/TakenCoursesCard.vue'
export default defineComponent({
    components: {
      TakenCoursesButtonAdd,
      TakenCoursesButtonDelete,
      TakenCoursesButtonSearch,
      TakenCoursesButtonCatalog,
      TakenCoursesCard
    },
    data() {
      return {
        activeIndex: '2',
        loading: true,
        AllTakenCourses: [],
        MainCategory: [],
        Subcategory: [],
        user: {
          name: 'Student'
        },

      };
    },

    created() {
      // Allow cookie to pass through CORS with " {withCredentials: true} ". Without this, there will either be CORS error or the backend will not be able to identy the
      // logged in session since no cookies was pass if we don't put " {withCredentials: true} ". This was the reason why "req.user.studentID" in backend was "undefined".
      // No cookies was send to the backend to identify the logged in user.

      axios.get('http://localhost:5000/getuser', {withCredentials: true})
      .then(res => {
        if (res.data == "Not Logged In") {
          this.$message.error({message: 'You are not logged in. Please log in first.', duration: 4000})
          this.$router.push({path: '/login'})
        } 
        else {
          this.user.name = res.data.user.firstname

          //load major category structure
          axios.get('http://localhost:5000/taken-courses/loadmajorcategorystructure', {withCredentials: true})
          .then((res) => {
        
            if(res.data == 'Error'){
            this.$message.error({message: 'Failed to load major category structure. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
            }
            this.MainCategory = res.data
            this.MainCategory = this.MainCategory.map(array => ({...array, obtainedCredit: 0, totalCredit: 0, subCategoryData: []}))

            //load sub category structure
            axios.get('http://localhost:5000/taken-courses/loadsubcategorystructure', {withCredentials: true})
            .then((res) => {
          
              if(res.data == 'Error'){
              this.$message.error({message: 'Failed to load sub category structure. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
              }
              this.Subcategory = res.data

              //load taken courses
              axios.get('http://localhost:5000/taken-courses/loadtakencourse', {withCredentials: true})
              .then((res) => {
              
                if(res.data == 'Error'){
                  this.$message.error({message: 'Failed to load taken courses. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                  return
                }
                this.AllTakenCourses = res.data

                //Group courses into sub category to display in each card
                for(let i = 0; i < this.MainCategory.length; i++){
                  let subCategoriesInAMainCategory = this.Subcategory.filter(categories => categories.mainCategory == this.MainCategory[i].name)
                  this.groupingCoursesbySubCategory(res.data, subCategoriesInAMainCategory, i, this.MainCategory[i].subCategoryData)
                }
                this.loading = false
              })
              .catch((err) => {
                console.log(err)
              })
            })
            .catch((err) => {
                console.log(err)
            })
            })
          .catch((err) => {
              console.log(err)
          })
        }
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      groupingCoursesbySubCategory(allTakenCoursesData, subCategory, MainCategoryIndex, subCategoryData) {
        for(let i = 0; i < subCategory.length; i++){
          let filtered
          if(subCategory[i].groupbyremark == false)
            filtered = allTakenCoursesData.filter(course => course.Category == subCategory[i].name && course.remark == "none")
          else
            filtered = allTakenCoursesData.filter(course => course.remark == subCategory[i].name)
          let obtained = filtered.map(filtered => filtered.Credit).reduce((total, filtered) => filtered + total, 0)
          this.MainCategory[MainCategoryIndex].obtainedCredit = this.MainCategory[MainCategoryIndex].obtainedCredit + obtained
          this.MainCategory[MainCategoryIndex].totalCredit = this.MainCategory[MainCategoryIndex].totalCredit + subCategory[i].totalcredit
          let filteredBySubCategory = {
            name :subCategory[i].name,
            obtainedCredit: obtained,
            totalCredit: subCategory[i].totalcredit,
            totalCreditAdvance: subCategory[i].totalCreditAdvance,
            taken : filtered
          }
          subCategoryData.push(filteredBySubCategory)
        }
        console.log(subCategoryData)

      },
    }
  });
</script>

<style>
/* reference: https://youtu.be/vQAvjof1oe4?t=363 */
.grid-ish{
  display: flex;
  flex-wrap: wrap;
}
.grid-ish > * {
  flex: 1 1 33%;
  min-width: 310px;
}
</style>
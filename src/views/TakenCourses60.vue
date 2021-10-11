<template>

<div v-loading="loading">
  
  <br>

  <h1>{{user.name}}'s Taken Courses</h1>

  <div class="container">

    <!-- Collapse -->
    <el-collapse v-model="activeNames" @change="handleChange" style="margin:30px; border:none;">

      <!-- buttons -->
      <el-row>

        <el-tooltip class="item" effect="dark" content="Add a course" placement="top">
          <el-button type="primary" icon="el-icon-plus" circle @click="dialogAddVisible = true"></el-button>
        </el-tooltip>
        

        <el-tooltip class="item" effect="dark" content="Delete a course" placement="top">
          <el-button type="danger" icon="el-icon-delete" circle @click="dialogDeleteVisible = true"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Search a taken course" placement="top">
          <el-button type="info" icon="el-icon-search" circle @click="dialogSearchVisible = true"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Open your Generation's Catalog" placement="top">
          <el-button type="info" icon="el-icon-document" circle @click="goToCatalog"></el-button>
        </el-tooltip>

      </el-row>
      
      <br>

      <h2 style="text-align:left;">General Education ( {{this.totalGECredit}} out of 48 )</h2>

      <el-row :gutter="24">
        <TakenCourseEnglishGauge :span="8" title="English Communication" :obtainedCredit="EnglishTotalCredit" totalCreditAdvance="12" totalCreditNormal="16" :courses="EnglishCourses"></TakenCourseEnglishGauge>

        <TakenCourseGauge :span="8" title="Natural Sciences" :obtainedCredit="NatSciTotalCredit" totalCredit="12" :courses="NatSciCourses"></TakenCourseGauge>

        <TakenCourseGauge :span="8" title="Humanities" :obtainedCredit="HumanityTotalCredit" totalCredit="8" :courses="HumanityCourses"></TakenCourseGauge>
      </el-row>

      <el-divider></el-divider>

      <el-row :gutter="24">
        <TakenCourseGauge :span="12" title="Social Sciences" :obtainedCredit="SocialSciTotalCredit" totalCredit="8" :courses="SocialSciCourses"></TakenCourseGauge>

        <TakenCourseGauge :span="12" title="Health Science and Physical Education" :obtainedCredit="PETotalCredit" totalCredit="4" :courses="PECourses"></TakenCourseGauge>
      </el-row>

      <br><br><br><br><br>
      <el-divider><i v-for="o in 19" :key="o" class="el-icon-caret-bottom" style="font-size: 30px"></i></el-divider>

      <h2 style="text-align:left;">Major Courses ( {{this.totalMajorCoursesCredit}} out of 130 )</h2>

      <el-row :gutter="24">
        <TakenCourseGauge :span="8" title="Core Courses" :obtainedCredit="CoreTotalCredit" totalCredit="41" :courses="CoreCourses"></TakenCourseGauge>

        <TakenCourseGauge :span="8" title="Required Major Courses" :obtainedCredit="RequiredTotalCredit" totalCredit="65" :courses="RequiredCourses"></TakenCourseGauge>

        <TakenCourseGauge :span="8" title="Elective Major Courses" :obtainedCredit="ElectiveTotalCredit" totalCredit="24" :courses="ElectiveCourses"></TakenCourseGauge>
      </el-row>
      
      <br><br><br><br><br>
      <el-divider><i v-for="o in 19" :key="o" class="el-icon-caret-bottom" style="font-size: 30px"></i></el-divider>

      <h2 style="text-align:left;">Special ( {{this.totalSpecialCoursesCredit}} out of 8 )</h2>

      <el-row :gutter="24">
        <TakenCourseGauge :span="8" title="Free Elective Courses" :obtainedCredit="FreeElectiveTotalCredit" totalCredit="8" :courses="FreeElectiveCourses"></TakenCourseGauge>
      </el-row>

      <br><br>

      <el-tag style="font-size: 30px;">Grand Total: {{this.totalGECredit + this.totalMajorCoursesCredit + this.totalSpecialCoursesCredit}} out of 186</el-tag>
      

    </el-collapse>

  </div>

  <!-- Add dialog box -->
  <el-dialog title="Adding a course" v-model="dialogAddVisible" width="30%" center>
    <!-- input -->
    <div class="sub-title">Add a course to the table</div>
    <el-autocomplete class="inline-input" style="width:100%" v-model="state1" :fetch-suggestions="querySearch" placeholder="Select a course" @select="addSelect" clearable></el-autocomplete>
    <el-radio-group v-model="special" style="margin-top:25px;">
      <el-radio :label="1">Normal</el-radio>
      <el-radio :label="2">Free Elective</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">Cancel</el-button>
        <el-button type="primary" :loading= addLoading.value @click="confirmAdd">Add {{addChoice.value}}</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- Delete dialog box -->
  <el-dialog title="Deleting a course" v-model="dialogDeleteVisible" width="30%" center>
    <!-- input -->
    <div class="sub-title">Delete a course from the table</div>
    <el-autocomplete class="inline-input" style="width:100%" v-model="state2" :fetch-suggestions="querySearch2" placeholder="Select a course" @select="deleteSelect" clearable></el-autocomplete>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">Cancel</el-button>
        <el-button type="danger" :loading= deleteLoading.value @click="confirmDelete">Delete {{deleteChoice.value}}</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- Search dialog box -->
  <el-dialog title="Search a taken course" v-model="dialogSearchVisible" width="30%" center>
    <!-- input -->
    <div class="sub-title">Check if you have already taken a course</div>
    <el-input v-model="searchInput" placeholder="Enter a Course ID" v-on:keyup.enter="search"></el-input>
    <em class="sub-title">Please check your spelling carefully (case insensitive)</em>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogSearchVisible = false">Close</el-button>
        <el-button type="primary" @click="search">Search</el-button>
      </span>
    </template>
  </el-dialog>

</div>

</template>

<script>
import { reactive, defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import TakenCourseTable from '../components/TakenCoursesComponent/TakenCourseTable.vue'
import TakenCourseGauge from '../components/TakenCoursesComponent/TakenCourseGauge.vue'
import TakenCourseEnglishGauge from '../components/TakenCoursesComponent/TakenCourseEnglishGauge.vue'
export default defineComponent({
    components: {
      TakenCourseTable,
      TakenCourseGauge,
      TakenCourseEnglishGauge
    },
    data() {
      return {
        dialogAddVisible: false,
        dialogDeleteVisible: false,
        dialogSearchVisible: false,
        searchInput: ref(''),
        activeIndex: '2',

        CoreCourses:[],
        RequiredCourses:[],
        ElectiveCourses:[],
        EnglishCourses:[],
        NatSciCourses:[],
        HumanityCourses:[],
        SocialSciCourses:[],
        PECourses:[],
        FreeElectiveCourses:[],

        CoreTotalCredit: 0,
        RequiredTotalCredit: 0,
        ElectiveTotalCredit: 0,
        EnglishTotalCredit: 0,
        NatSciTotalCredit: 0,
        HumanityTotalCredit: 0,
        SocialSciTotalCredit: 0,
        PETotalCredit: 0,
        FreeElectiveTotalCredit: 0,

        totalGECredit: 0,
        totalMajorCoursesCredit: 0,
        totalSpecialCoursesCredit: 0,

        loading: true,
        categories: [],

        user: {
          name: 'Student'
        },
        colors: [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#6f7ad3', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#5cb87a', percentage: 100 },
        ]
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
        } else {
          if(res.data.user.studentID.substring(0,2) != '60'){
            this.$message.warning({message: `Redirecting you to Generation ${res.data.user.studentID.substring(0,2)}.`, duration: 6000})
            this.$router.push({path: `/takencourses${res.data.user.studentID.substring(0,2)}`})
          } else {
            this.user.name = res.data.user.firstname

            axios.get('http://localhost:5000/taken-courses/loadtakencourse', {withCredentials: true})
            .then((res) => {
            
            if(res.data == 'Error'){
              this.$message.error({message: 'Failed to load taken courses. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
            }

            //filter JSON data
            this.CoreCourses = res.data.filter(course => course.Category =="Core Courses" && course.remark == "none")

            this.RequiredCourses = res.data.filter(course => course.Category =="Required Major Courses" && course.remark == "none")

            this.ElectiveCourses = res.data.filter(course => course.Category =="Elective Major Courses" && course.remark == "none")

            this.EnglishCourses = res.data.filter(course => course.Category =="English Communication" && course.remark == "none")
                  
            this.NatSciCourses = res.data.filter(course => course.Category =="Natural Sciences" && course.remark == "none")
                        
            this.HumanityCourses = res.data.filter(course => course.Category =="Humanities" && course.remark == "none")

            this.SocialSciCourses = res.data.filter(course => course.Category =="Social Sciences" && course.remark == "none")

            this.PECourses = res.data.filter(course => course.Category =="Health Science and Physical Education" && course.remark == "none")

            this.FreeElectiveCourses = res.data.filter(course => course.remark == "free elective")

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

            this.FreeElectiveTotalCredit = this.FreeElectiveCourses.map(FreeElectiveCourses => FreeElectiveCourses.Credit).reduce((total, FreeElectiveCourses) => FreeElectiveCourses + total, 0)

            this.totalGECredit = this.EnglishTotalCredit + this.NatSciTotalCredit + this.HumanityTotalCredit + this.SocialSciTotalCredit + this.PETotalCredit

            this.totalMajorCoursesCredit = this.CoreTotalCredit + this.RequiredTotalCredit + this.ElectiveTotalCredit

            this.totalSpecialCoursesCredit = this.FreeElectiveTotalCredit

            this.EnglishTotalCreditText = `Total Credit Earned: ${this.EnglishTotalCredit} out of 12 - 16`

            this.NatSciTotalCreditText = `Total Credit Earned: ${this.NatSciTotalCredit} out of 12`

            this.HumanityTotalCreditText = `Total Credit Earned: ${this.HumanityTotalCredit} out of 8`

            this.SocialSciTotalCreditText = `Total Credit Earned: ${this.SocialSciTotalCredit} out of 8`

            this.PETotalCreditText = `Total Credit Earned: ${this.PETotalCredit} out of 4`
            
            this.CoreTotalCreditText = `Total Credit Earned: ${this.CoreTotalCredit} out of 41`

            this.RequiredTotalCreditText = `Total Credit Earned: ${this.RequiredTotalCredit} out of 65`

            this.ElectiveTotalCreditText = `Total Credit Earned: ${this.ElectiveTotalCredit} out of 24`

            this.FreeElectiveTotalCreditText = `Total Credit Earned: ${this.FreeElectiveTotalCredit} out of 8`
            
            this.loading = false
            })
            .catch((err) => {
              console.log(err)
            })
          }
        }
      })
    },
    //logical concern for add and delete button
    setup() {
      //vue composition api "setup" passing in variables to component 
      //ref:https://www.codegrepper.com/code-examples/javascript/vue+composition+api+%22setup%22+passing+in+variables+to+component
      const addChoice = reactive({value: ''})
      const deleteChoice = reactive({value: ''})
      const special = ref(1)

      const addLoading = reactive({value: false})
      const deleteLoading = reactive({value: false})

      const restaurants = ref([]);
      const restaurants2 = ref([]);
      const querySearch = (queryString, cb) => {
        var results = queryString
          ? restaurants.value.filter(createFilter(queryString))
          : restaurants.value;
          // call callback function to return suggestions
          cb(results);
      };
       const querySearch2 = (queryString, cb) => {
        var results = queryString
          ? restaurants2.value.filter(createFilter(queryString))
          : restaurants2.value;
          // call callback function to return suggestions
          cb(results);
      };
      const createFilter = (queryString) => {
        return (restaurant) => {
          return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      };
      // This function is called immediately when user loads the page.
      const loadAll = () => {
        //load all non taken courses for adding
        axios.get('http://localhost:5000/taken-courses/loadcourselist', {withCredentials: true})
        .then((response) => {
          if(response.data == 'Error'){
            this.$message.error({message: 'Failed to load course list. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
          }
          // console.log('hello')
          // console.log(response)
          var data = []
          for (var i = 0; i < response.data.length; i++){
            data.push({value: response.data[i].ID + ' ' + response.data[i].Name})
          }
          restaurants.value = data
          // console.log(restaurants)
          return
        })
        //load all taken courses for deleting
        axios.get('http://localhost:5000/taken-courses/loadtakencourse', {withCredentials: true})
        .then((response) => {
          if(response.data == 'Error'){
            this.$message.error({message: 'Failed to load taken courses. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
          }
          // console.log('hello')
          // console.log(response)
          var data = []
          for (var i = 0; i < response.data.length; i++){
            data.push({value: response.data[i].ID + ' ' + response.data[i].Name})
          }
          restaurants2.value = data
          // console.log(restaurants2)
          return
        })
      };
      //function for add button
      const addSelect = (item) => {
        let choice = item.value.split(' ')      
        addChoice.value = choice[0]
        console.log("select " + addChoice.value + ", radio choice:" + special.value)
      };
      const confirmAdd = () => {
        if(addChoice.value == ''){
          alert("Please select a course.")
        }
        else{
          addLoading.value = true
          let remark = ''
          switch (special.value) {
            case 1:
              remark = "none";
              break; 
            case 2:
              remark = "free elective";
              break; 
            case 3: 
              remark = "i-design elective";
              break;
            default:
              remark = "none"; 
          }
          console.log("confirm add " + addChoice.value + " as " + remark)
          axios.get("http://localhost:5000/taken-courses/addtakencourse/" + addChoice.value + '/' + remark, {withCredentials: true})
          .then((res) => {
            if(res.data == 'Error'){
              this.$message.error({message: 'Failed to add course. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
            }
            console.log('adding..')
            console.log(res.data)
            if(res.data == "add success"){
              alert("Added success.")
              window.location.reload()
            }
            else{
              alert("An error has occured.")
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }
      };
      //function for delete button
      const deleteSelect = (item) => {
        let choice = item.value.split(' ')      
        deleteChoice.value = choice[0]
        console.log("select " + deleteChoice.value)
      };
      const confirmDelete = () => {
        if(deleteChoice.value == ''){
          alert("Please select a course.")
        }
        else{
          deleteLoading.value = true
          console.log("confirm delete " + deleteChoice.value)
          axios.delete("http://localhost:5000/taken-courses/deletetakencourse/" + deleteChoice.value , {withCredentials: true})
          .then((res) => {
            if(res.data == 'Error'){
              this.$message.error({message: 'Failed to delete course. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
            }
            console.log('deleting..')
            console.log(res.data)
            if(res.data == "delete success"){
              alert("Delete success.")
              window.location.reload()
            }
            else{
              alert("An error has occured.")
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }
      };
      onMounted(() => {
        loadAll();
      });
      return {
        restaurants,
        restaurants2,
        state1: ref(''),
        state2: ref(''),
        addLoading,
        deleteLoading,
        special,
        addChoice,
        deleteChoice,
        querySearch,
        querySearch2,
        createFilter,
        loadAll,
        addSelect,
        confirmAdd,
        deleteSelect,
        confirmDelete
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      search(){
        if (this.searchInput.length != 7){
          this.$message.error({message: 'Invalid input. Please type the correct (7 characters) course ID.', duration: 6000})
          return
        }
        var allCourses = this.EnglishCourses.concat(this.NatSciCourses).concat(this.HumanityCourses)
        .concat(this.SocialSciCourses).concat(this.PECourses).concat(this.CoreCourses).concat(this.RequiredCourses)
        .concat(this.ElectiveCourses).concat(this.FreeElectiveCourses)
        
        const result = allCourses.find( ({ ID }) => ID == this.searchInput.toUpperCase() )
        
        if (result === undefined){
          this.$notify.error({message: 'You have NOT taken that course yet!', title: 'Not Found!', duration: 6000})
        } else {
          this.$notify.success({message: 'You have ALREADY taken that course!', title: 'Found!', duration: 6000})
        }
      },
      goToCatalog(){
        window.open("https://muic.mahidol.ac.th/eng/wp-content/downloads/catalog/muic_catalog_2017.pdf");
      }
    }
  });
</script>

<style>

</style>
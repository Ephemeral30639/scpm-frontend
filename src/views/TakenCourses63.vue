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

      </el-row>
      
      <br>

      <h2 style="text-align:left;">Refresher Courses</h2>

      <TakenCourseTable title="Foundation Courses" name="4" :courses="foundationCourses" :totalCredit="foundationTotalCredit"></TakenCourseTable>

      <br><br>

      <h2 style="text-align:left;">General Education</h2>

      <TakenCourseTable title="English Communication" name="4" :courses="EnglishCourses" :totalCredit="EnglishTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Life Appreciation" name="5" :courses="lifeAppreciationCourses" :totalCredit="lifeAppreciationTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Global Citizenship" name="6" :courses="globalCitizenshipCourses" :totalCredit="globalCitizenshipTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Critical Thinking" name="7" :courses="criticalThinkingCourses" :totalCredit="criticalThinkingTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Leadership" name="8" :courses="leadershipCourses" :totalCredit="leadershipTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Digital Literacy" name="9" :courses="digitalLiteracyCourses" :totalCredit="digitalLiteracyTotalCredit"></TakenCourseTable>

      <br><br>

      <h2 style="text-align:left;">Major Courses</h2>

      <TakenCourseTable title="Engineering Core Courses" name="1" :courses="engineeringCoreCourses" :totalCredit="engineeringCoreTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Major Required Courses" name="2" :courses="majorRequiredCourses" :totalCredit="majorRequiredTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="Computer Engineering Elective Courses" name="3" :courses="computerEngineeringElectiveCourses" :totalCredit="computerEngineeringElectiveTotalCredit"></TakenCourseTable>
      
      <br><br>

      <h2 style="text-align:left;">Special</h2>

      <TakenCourseTable title="Free Elective Courses" name="9" :courses="FreeElectiveCourses" :totalCredit="FreeElectiveTotalCredit"></TakenCourseTable>

      <TakenCourseTable title="I-Design Elective Courses" name="10" :courses="IDesignCourses" :totalCredit="IDesignTotalCredit"></TakenCourseTable>
      

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
      <el-radio :label="3">I-Design Elective</el-radio>
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

</div>

</template>

<script>
import { reactive, defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import TakenCourseTable from '../components/TakenCoursesComponent/TakenCourseTable.vue'
export default defineComponent({
    components: {
      TakenCourseTable
    },
    data() {
      return {
        dialogAddVisible: false,
        dialogDeleteVisible: false,
        activeIndex: '2',

        foundationCourses: [],
        EnglishCourses:[],
        lifeAppreciationCourses: [],
        globalCitizenshipCourses: [],
        criticalThinkingCourses: [],
        leadershipCourses: [],
        digitalLiteracyCourses: [],
        engineeringCoreCourses: [],
        majorRequiredCourses: [],
        computerEngineeringElectiveCourses: [],
        IDesignCourses:[],
        FreeElectiveCourses:[],

        foundationTotalCredit: 0,
        EnglishTotalCredit: 0,
        lifeAppreciationTotalCredit: 0,
        globalCitizenshipTotalCredit: 0,
        criticalThinkingTotalCredit: 0,
        leadershipTotalCredit: 0,
        digitalLiteracyTotalCredit: 0,
        engineeringCoreTotalCredit: 0,
        majorRequiredTotalCredit: 0,
        computerEngineeringElectiveTotalCredit: 0,
        IDesignTotalCredit: 0,
        FreeElectiveTotalCredit: 0,

        loading: true,
        categories: [],

        user: {
          name: 'Student'
        }
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
          if(res.data.user.studentID.substring(0,2) != '63'){
            this.$message.warning({message: `You are not Generation 63. Redirecting you to Generation ${res.data.user.studentID.substring(0,2)}.`, duration: 6000})
            this.$router.push({path: `/takencourses${res.data.user.studentID.substring(0,2)}`})
          } else {
            this.user.name = res.data.user.firstname

            axios.get('http://localhost:5000/taken-courses/loadtakencourse', {withCredentials: true})
            .then((res) => {

            //filter JSON data
            this.foundationCourses = res.data.filter(course => course.Category =="Foundation Courses" && course.remark == "none")

            this.EnglishCourses = res.data.filter(course => course.Category =="English Communication" && course.remark == "none")

            this.lifeAppreciationCourses = res.data.filter(course => course.Category =="Life Appreciation" && course.remark == "none")

            this.globalCitizenshipCourses = res.data.filter(course => course.Category =="Global Citizenship" && course.remark == "none")
                  
            this.criticalThinkingCourses = res.data.filter(course => course.Category =="Critical Thinking" && course.remark == "none")
                        
            this.leadershipCourses = res.data.filter(course => course.Category =="Leadership" && course.remark == "none")

            this.digitalLiteracyCourses = res.data.filter(course => course.Category =="Digital Literacy" && course.remark == "none")

            this.engineeringCoreCourses = res.data.filter(course => course.Category =="Engineering Core Courses" && course.remark == "none")

            this.majorRequiredCourses = res.data.filter(course => course.Category =="Major Required Courses" && course.remark == "none")

            this.computerEngineeringElectiveCourses = res.data.filter(course => course.Category =="Computer Engineering Elective Courses" && course.remark == "none")

            this.FreeElectiveCourses = res.data.filter(course => course.remark == "free elective")

            this.IDesignCourses = res.data.filter(course => course.remark == "i-design elective")

            //sum JSON object keys
            //Fixed reduce empty array by adding initial value ref:https://stackoverflow.com/questions/23359173/javascript-reduce-an-empty-array
            this.foundationTotalCredit = this.foundationCourses.map(foundationCourses => foundationCourses.Credit).reduce((total, foundationCourses) => foundationCourses + total, 0)

            this.EnglishTotalCredit = this.EnglishCourses.map(EnglishCourses => EnglishCourses.Credit).reduce((total, EnglishCourses) => EnglishCourses + total, 0)

            this.lifeAppreciationTotalCredit = this.lifeAppreciationCourses.map(lifeAppreciationCourses => lifeAppreciationCourses.Credit).reduce((total, lifeAppreciationCourses) => lifeAppreciationCourses + total, 0)

            this.globalCitizenshipTotalCredit = this.globalCitizenshipCourses.map(globalCitizenshipCourses => globalCitizenshipCourses.Credit).reduce((total, globalCitizenshipCourses) => globalCitizenshipCourses + total, 0)

            this.criticalThinkingTotalCredit = this.criticalThinkingCourses.map(criticalThinkingCourses => criticalThinkingCourses.Credit).reduce((total, criticalThinkingCourses) => criticalThinkingCourses + total, 0)

            this.leadershipTotalCredit = this.leadershipCourses.map(leadershipCourses => leadershipCourses.Credit).reduce((total, leadershipCourses) => leadershipCourses + total, 0)

            this.digitalLiteracyTotalCredit = this.digitalLiteracyCourses.map(digitalLiteracyCourses => digitalLiteracyCourses.Credit).reduce((total, digitalLiteracyCourses) => digitalLiteracyCourses + total, 0)

            this.engineeringCoreTotalCredit = this.engineeringCoreCourses.map(engineeringCoreCourses => engineeringCoreCourses.Credit).reduce((total, engineeringCoreCourses) => engineeringCoreCourses + total, 0)

            this.majorRequiredTotalCredit = this.majorRequiredCourses.map(majorRequiredCourses => majorRequiredCourses.Credit).reduce((total, majorRequiredCourses) => majorRequiredCourses + total, 0)

            this.computerEngineeringElectiveTotalCredit = this.computerEngineeringElectiveCourses.map(computerEngineeringElectiveCourses => computerEngineeringElectiveCourses.Credit).reduce((total, computerEngineeringElectiveCourses) => computerEngineeringElectiveCourses + total, 0)

            this.FreeElectiveTotalCredit = this.FreeElectiveCourses.map(FreeElectiveCourses => FreeElectiveCourses.Credit).reduce((total, FreeElectiveCourses) => FreeElectiveCourses + total, 0)

            this.IDesignTotalCredit = this.IDesignCourses.map(IDesignCourses => IDesignCourses.Credit).reduce((total, IDesignCourses) => IDesignCourses + total, 0)

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
    }
  });
</script>

<style>

</style>
<template>
<div v-loading="allLoading">
  <h1>Current Trimester</h1>
  <h3>{{trimester}}</h3>
  <el-input v-model="search" style="width: 80%; margin: auto;" size="large" placeholder="Type a Course ID to search (e.g. EGCI201)" />

    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 80%; margin: auto; box-shadow: 0 8px 6px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);"
      @selection-change="handleSelectionChange"
      max-height="400"
      :default-sort = "{prop: 'id', order: 'ascending'}"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="150" sortable>
        <template #default="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column property="name" label="Name" sortable>
      </el-table-column>
      <el-table-column property="day" label="Day">
      </el-table-column>
      <el-table-column property="time" label="Time">
      </el-table-column>
    </el-table>

    <el-dialog title="Your Current Enrollment" v-model="dialogTableVisible">
      <el-table
        ref="multipleTable"
        :data="gridData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        max-height="400"
        v-loading="dialogTableloading"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="ID">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name">
        </el-table-column>
        <el-table-column property="day" label="Day">
        </el-table-column>
        <el-table-column property="time" label="Time">
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer" v-loading="dialogLoading">
          <el-button @click="dialogTableVisible = false">Cancel</el-button>
          <el-button type="danger" @click="unenroll()">Unenroll</el-button
          >
        </span>
      </template>
    </el-dialog>

    <div style="margin-top: 20px">
      <el-button type="primary" @click="enroll()">Enroll</el-button>
      <el-button @click="toggleSelection()">Clear selection</el-button>
      <el-button type="danger" @click="openDialog()">Unenroll</el-button>
    </div>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        allLoading: true,
        dialogTableloading: false,
        dialogLoading: false,
        gridData: [],
        dialogTableVisible: false,
        trimester: '',
        search: ''
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach((row) => {
              console.log(row)
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      unenroll(){
        this.dialogLoading = true
        axios.defaults.withCredentials = true
        axios.post('https://scpm2021backend.herokuapp.com/enrollment/unenroll', this.multipleSelection, {params:{trimester: this.trimester}})
        .then(response => {
          if(response.data == 'Error'){
            this.$message.error({message: 'Failed to unenroll. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
          }
            if (response.data == 'Success'){
                this.$message.success({message: 'Successfully Unenrolled', duration: 4000})
                this.$router.push({path: '/'})
                this.dialogLoading = false
            }
        })
      },
      enroll(){
        this.allLoading = true
        axios.defaults.withCredentials = true
        axios.post('https://scpm2021backend.herokuapp.com/enrollment/enroll', this.multipleSelection, {params:{trimester: this.trimester}})
        .then(response => {
          if(response.data == 'Error'){
            this.$message.error({message: 'Failed to enroll. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
          }
          if (response.data == 'Success'){
              this.$message.success({message: 'Successfully Enrolled', duration: 4000})
              this.$router.push({path: '/'})
              this.allLoading = false
          }
        })
      },
      openDialog(){
        this.$refs.multipleTable.clearSelection()
        this.dialogTableVisible = true
        this.dialogTableloading = true
        this.gridData = []
        axios.defaults.withCredentials = true
        axios.get('https://scpm2021backend.herokuapp.com/getcurrenttrimester/studentcurrentenrollment', {params:{trimester: this.trimester}})
        .then(response => {
          if(response.data == 'Error'){
            this.$message.error({message: 'Failed to load your enrollment. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
          }
            // console.log(response.data)

            var data = response.data
            var course = []
            var newTableData = []

            // console.log(data)

            // Filtering out dupicate courses.
            // This is basically finding activeCourses but without connecting to the backend for it. Thus, optimizing the performance (reduce calling backend).
            // Reference: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
            const ids = data.map(o => o.ID)
            const activeCourses = data.filter(({ID}, index) => !ids.includes(ID, index + 1))

            for (var i = 0; i < activeCourses.length; i++){
              // For each activeCourses, you filter the data to only consist of that specific course.
              course = data.filter(x => x.ID == activeCourses[i].ID)

              // For each specific course, filter out the uuid duplicates
              const ids2 = course.map(o => o.uuid)
              const activeuuid = course.filter(({uuid}, index) => !ids2.includes(uuid, index + 1))
              // console.log(course[0].ID)
              // console.log(course)

              //For each uuid in the array, combine the timetables as necessary.
              for (var j = 0; j < activeuuid.length; j++){
                var specificCourse = course.filter(x => x.uuid == activeuuid[j].uuid)

                // This course only has one timetable. E.g.: ICPEs
                if (specificCourse.length == 1){
                  newTableData.push(specificCourse[0])
                }

                // This course has two timetables (most MUIC courses are like this).
                if (specificCourse.length == 2){
                  // If the two times are the same, combine the days only.
                  if(specificCourse[0].Time == specificCourse[1].Time){
                    specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date}`
                  } else { // Else, combine the days and times
                    specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date}`
                    specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time}`
                  }
                  newTableData.push(specificCourse[0])
                }

                // Any course that has more than 2 timetables will have its timetables combined without any conditioning. 
                // NOTE: We never encountered a course with more than 3 timetables. If, in the future, there is a course with 4 or more timetimables, simply add more "if" statement and combine it all.
                if (specificCourse.length == 3){
                  specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date} and ${specificCourse[2].Date}`
                  specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time} | ${specificCourse[2].Time}`
                  newTableData.push(specificCourse[0])
                }

                if (specificCourse.length == 4){
                  specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date} and ${specificCourse[2].Date} and ${specificCourse[3].Date}`
                  specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time} | ${specificCourse[2].Time} | ${specificCourse[3].Time}`
                  newTableData.push(specificCourse[0])
                }

                if (specificCourse.length == 5){
                  specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date} and ${specificCourse[2].Date} and ${specificCourse[3].Date} and ${specificCourse[4].Date}`
                  specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time} | ${specificCourse[2].Time} | ${specificCourse[3].Time} | ${specificCourse[4].Time}`
                  newTableData.push(specificCourse[0])
                }
              }
            }

            // After the processing is finished, we push it into the variable that frontend will read from.
            // console.log(newTableData)
            for (var j = 0; j < newTableData.length; j++){
              this.gridData.push({id: newTableData[j].ID, name: newTableData[j].Name, day: newTableData[j].Date, time: newTableData[j].Time, uuid: newTableData[j].uuid})
            }
            this.dialogTableloading = false
        })
      }
    },

    mounted(){
      axios.defaults.withCredentials = true
      axios.get('https://scpm2021backend.herokuapp.com/getcurrenttrimester/currenttrimester')
        .then(response => {
            if(response.data == 'Error'){
              this.$message.error({message: 'Failed to load current trimester. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
            }
            this.trimester = response.data[0].trimester

            axios.get('https://scpm2021backend.herokuapp.com/getcurrenttrimester/timetable', {params:{trimester: this.trimester}})
            .then(response => {
                if(response.data == 'Error'){
                  this.$message.error({message: 'Failed to load timetable. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                  return
                }

                // Check if the user is logged in.
                if (response.data == "Not Logged In") {
                  this.$message.error({message: 'You are not logged in. Please log in first.', duration: 4000})
                  this.$router.push({path: '/login'})
                }

                var data = response.data
                var course = []
                var newTableData = []

                // console.log(data)

                // Filtering out dupicate courses.
                // This is basically finding activeCourses but without connecting to the backend for it. Thus, optimizing the performance (reduce calling backend).
                // Reference: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
                const ids = data.map(o => o.ID)
                const activeCourses = data.filter(({ID}, index) => !ids.includes(ID, index + 1))

                for (var i = 0; i < activeCourses.length; i++){
                  // For each activeCourses, you filter the data to only consist of that specific course.
                  course = data.filter(x => x.ID == activeCourses[i].ID)

                  // For each specific course, filter out the uuid duplicates
                  const ids2 = course.map(o => o.uuid)
                  const activeuuid = course.filter(({uuid}, index) => !ids2.includes(uuid, index + 1))
                  // console.log(course[0].ID)
                  // console.log(course)

                  //For each uuid in the array, combine the timetables as necessary.
                  for (var j = 0; j < activeuuid.length; j++){
                    var specificCourse = course.filter(x => x.uuid == activeuuid[j].uuid)

                    // This course only has one timetable. E.g.: ICPEs
                    if (specificCourse.length == 1){
                      newTableData.push(specificCourse[0])
                    }

                    // This course has two timetables (most MUIC courses are like this).
                    if (specificCourse.length == 2){
                      // If the two times are the same, combine the days only.
                      if(specificCourse[0].Time == specificCourse[1].Time){
                        specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date}`
                      } else { // Else, combine the days and times
                        specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date}`
                        specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time}`
                      }
                      newTableData.push(specificCourse[0])
                    }

                    // Any course that has more than 2 timetables will have its timetables combined without any conditioning. 
                    // NOTE: We never encountered a course with more than 3 timetables. If, in the future, there is a course with 4 or more timetimables, simply add more "if" statement and combine it all.
                    if (specificCourse.length == 3){
                      specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date} and ${specificCourse[2].Date}`
                      specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time} | ${specificCourse[2].Time}`
                      newTableData.push(specificCourse[0])
                    }

                    if (specificCourse.length == 4){
                      specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date} and ${specificCourse[2].Date} and ${specificCourse[3].Date}`
                      specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time} | ${specificCourse[2].Time} | ${specificCourse[3].Time}`
                      newTableData.push(specificCourse[0])
                    }

                    if (specificCourse.length == 5){
                      specificCourse[0].Date = `${specificCourse[0].Date} and ${specificCourse[1].Date} and ${specificCourse[2].Date} and ${specificCourse[3].Date} and ${specificCourse[4].Date}`
                      specificCourse[0].Time = `${specificCourse[0].Time} | ${specificCourse[1].Time} | ${specificCourse[2].Time} | ${specificCourse[3].Time} | ${specificCourse[4].Time}`
                      newTableData.push(specificCourse[0])
                    }
                  }
                }

                // After the processing is finished, we push it into the variable that frontend will read from.
                for (var j = 0; j < newTableData.length; j++){
                    this.tableData.push({id: newTableData[j].ID, name: newTableData[j].Name, day: newTableData[j].Date, time: newTableData[j].Time, uuid: newTableData[j].uuid})
                }
                this.allLoading = false
            })
        })
    }
  }
</script>
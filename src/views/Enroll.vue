<template>
<h1>Current Trimester</h1>
<h3>T2 2020-2021</h3>

  <el-table
    ref="multipleTable"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    max-height="400"
    v-loading="loading"
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
      <span class="dialog-footer">
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
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        loading: true,
        dialogTableloading: false,
        gridData: [],
        dialogTableVisible: false
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
        axios.post('http://localhost:5000/enrollment/unenroll', this.multipleSelection, {withCredentials: true})
        .then(response => {
            if (response.data == 'Success'){
                alert('UnEnroll Success')
               this.$router.push({path: '/'})
            }
        })
      },
      enroll(){
        axios.post('http://localhost:5000/enrollment/enroll', this.multipleSelection, {withCredentials: true})
        .then(response => {
            if (response.data == 'Success'){
                alert('Enroll Success')
               this.$router.push({path: '/'})
            }
        })
      },
      openDialog(){
        this.$refs.multipleTable.clearSelection()
        this.dialogTableVisible = true
        this.dialogTableloading = true
        this.gridData = []
        axios.get('http://localhost:5000/getcurrenttrimester/studentcurrentenrollment', {withCredentials: true})
        .then(response => {
            // console.log(response.data)

            var data = response.data

            // Filtering out dupicate courses.
            // This is basically finding activeCourses but without connecting to the backend for it. Thus, optimizing the performance (reduce calling backend).
            // Reference: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
            const ids = data.map(o => o.ID)
            const activeCourses = data.filter(({ID}, index) => !ids.includes(ID, index + 1))

            var course = []
            var newTableData = []
            for (var i = 0; i < activeCourses.length; i++){
              // For each activeCourses, you filter the courses to only consist of that specific course.
              course = data.filter(x => x.ID == activeCourses[i].ID)

              // If the course length is more than one, that means that this course has two blocks. So we need to combine it.
              if (course.length > 1){
                // If the time is the same for both blocks, then just combine the days.
                if (course[0].Time == course[1].Time){
                  course[0].Date = `${course[0].Date} and ${course[1].Date}`
                } else { // Else, combine the two time and two days together.
                  course[0].Date = `${course[0].Date} and ${course[1].Date}`
                  course[0].Time = `${course[0].Time} | ${course[1].Time}`
                }
                // Push into the variable.
                newTableData.push(course[0])
              } else { // Getting here would mean that the course length is 1 or lower. This would indicate a course with single block. Simply push it into the new variable.
                newTableData.push(course[0])
              }
            }

            // After the processing is finished, we push it into the variable that frontend will read from.
            for (var j = 0; j < newTableData.length; j++){
              this.gridData.push({id: newTableData[j].ID, name: newTableData[j].Name, day: newTableData[j].Date, time: newTableData[j].Time})
            }
            this.dialogTableloading = false
        })
      }
    },

    mounted(){
      axios.get('http://localhost:5000/getcurrenttrimester/timetable', {withCredentials: true})
      .then(response => {

          // Check if the user is logged in.
          if (response.data == "Not Logged In") {
            alert("You are not logged in. Please log in first.")
            this.$router.push({path: '/login'})
          }

          var data = response.data
          var course = []
          var newTableData = []

          // Filtering out dupicate courses.
          // This is basically finding activeCourses but without connecting to the backend for it. Thus, optimizing the performance (reduce calling backend).
          // Reference: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
          const ids = data.map(o => o.ID)
          const activeCourses = data.filter(({ID}, index) => !ids.includes(ID, index + 1))

          for (var i = 0; i < activeCourses.length; i++){
            // For each activeCourses, you filter the courses to only consist of that specific course.
            course = data.filter(x => x.ID == activeCourses[i].ID)

            // If the course length is more than one, that means that this course has two blocks. So we need to combine it.
            if (course.length > 1){
              // If the time is the same for both blocks, then just combine the days.
              if (course[0].Time == course[1].Time){
                course[0].Date = `${course[0].Date} and ${course[1].Date}`
              } else { // Else, combine the two time and two days together.
                course[0].Date = `${course[0].Date} and ${course[1].Date}`
                course[0].Time = `${course[0].Time} | ${course[1].Time}`
              }
              // Push into the variable.
              newTableData.push(course[0])
            } else { // Getting here would mean that the course length is 1 or lower. This would indicate a course with single block. Simply push it into the new variable since we don't have to combine anything.
              newTableData.push(course[0])
            }
          }

          // After the processing is finished, we push it into the variable that frontend will read from.
          for (var j = 0; j < newTableData.length; j++){
            this.tableData.push({id: newTableData[j].ID, name: newTableData[j].Name, day: newTableData[j].Date, time: newTableData[j].Time})
          }
          this.loading = false
      })
    }
  }
</script>
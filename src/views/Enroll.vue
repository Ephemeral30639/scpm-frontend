<template>
<div v-loading="allLoading">
  <h1>Current Trimester</h1>
  <h3>{{trimester}}</h3>
  <el-input v-model="search" style="width: 80%; margin: auto;" size="medium" placeholder="Type a Course ID to search (e.g. EGCI201)" />

    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 80%; margin: auto; box-shadow: 0 8px 6px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);"
      @selection-change="handleSelectionChange"
      max-height="400"
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
        axios.post('http://localhost:5000/enrollment/unenroll', this.multipleSelection, {params:{trimester: this.trimester}})
        .then(response => {
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
        axios.post('http://localhost:5000/enrollment/enroll', this.multipleSelection, {params:{trimester: this.trimester}})
        .then(response => {
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
        axios.get('http://localhost:5000/getcurrenttrimester/studentcurrentenrollment', {params:{trimester: this.trimester}})
        .then(response => {
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
              // For each activeCourses, you filter the courses to only consist of that specific course.
              course = data.filter(x => x.ID == activeCourses[i].ID)
              console.log(course[0].ID)
              console.log(course)

              // ICPE are special case, hence why we need to separate the logic from the rest of the courses
              if(activeCourses[i].ID.substring(0,4) != 'ICPE'){
                for(var j = 0; j < course.length; j += 2){
                  // If the course length is more than one, that means that this course has two blocks. So we need to combine it.
                  if (course.length > 1){
                    // If the time is the same for both blocks, then just combine the days.
                    // We also have to make sure that it's even. If it's not even, this logic will not work and will require other logic to deal with it.
                    if (course.length % 2 == 0){
                      if (course[j].Time == course[j+1].Time){
                        course[j].Date = `${course[j].Date} and ${course[j+1].Date}`
                      } else { // Else, combine the two time and two days together.
                        course[j].Date = `${course[j].Date} and ${course[j+1].Date}`
                        course[j].Time = `${course[j].Time} | ${course[j+1].Time}`
                      }
                    } else { // Else if the course length is odd, we run this logic instead.
                      newTableData.push(course[j])
                      j -= 1
                      continue

                      // The below code is the previous logic for more than 1 and is odd course length.
                      // However, there are way too much possible combination of course timetable and there are no standadized input.
                      // So we opt for just literally putting in raw data without combining like other courses for sanity sake.
                      // if (course[j].Time == course[j+1].Time){
                      //   course[j].Date = `${course[j].Date} and ${course[j+1].Date}`
                      // } else {
                      //   newTableData.push(course[j])
                      //   j -= 1
                      //   continue
                      // }
                    }

                    // Push into the variable.
                    newTableData.push(course[j])
                  } else { // Getting here would mean that the course length is 1 or lower. This would indicate a course with single block. Simply push it into the new variable since we don't have to combine anything.
                  newTableData.push(course[j])
                  }
                }
              }

              // If this course is a ICPE course then run this logic
              if(activeCourses[i].ID.substring(0,4) == 'ICPE'){
                for(var j = 0; j < course.length; j++){
                  newTableData.push(course[j])
                }
              }

            }

            // After the processing is finished, we push it into the variable that frontend will read from.
            console.log(newTableData)
            for (var j = 0; j < newTableData.length; j++){
              this.gridData.push({id: newTableData[j].ID, name: newTableData[j].Name, day: newTableData[j].date, time: newTableData[j].time})
            }
            this.dialogTableloading = false
        })
      }
    },

    mounted(){
      axios.defaults.withCredentials = true
      axios.get('http://localhost:5000/getcurrenttrimester/currenttrimester')
        .then(response => {
            this.trimester = response.data[0].trimester

            axios.get('http://localhost:5000/getcurrenttrimester/timetable', {params:{trimester: this.trimester}})
            .then(response => {

                // Check if the user is logged in.
                if (response.data == "Not Logged In") {
                  this.$message.error({message: 'You are not logged in. Please log in first.', duration: 4000})
                  this.$router.push({path: '/login'})
                }

                var data = response.data
                var course = []
                var newTableData = []

                console.log(data)

                // Filtering out dupicate courses.
                // This is basically finding activeCourses but without connecting to the backend for it. Thus, optimizing the performance (reduce calling backend).
                // Reference: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
                const ids = data.map(o => o.ID)
                const activeCourses = data.filter(({ID}, index) => !ids.includes(ID, index + 1))

                for (var i = 0; i < activeCourses.length; i++){
                  // For each activeCourses, you filter the courses to only consist of that specific course.
                  course = data.filter(x => x.ID == activeCourses[i].ID)
                  console.log(course[0].ID)
                  console.log(course)

                  // ICPE are special case, hence why we need to separate the logic from the rest of the courses
                  if(activeCourses[i].ID.substring(0,4) != 'ICPE'){
                    for(var j = 0; j < course.length; j += 2){
                      // If the course length is more than one, that means that this course has two blocks. So we need to combine it.
                      if (course.length > 1){
                        // If the time is the same for both blocks, then just combine the days.
                        // We also have to make sure that it's even. If it's not even, this logic will not work and will require other logic to deal with it.
                        if (course.length % 2 == 0){
                          if (course[j].Time == course[j+1].Time){
                            course[j].Date = `${course[j].Date} and ${course[j+1].Date}`
                          } else { // Else, combine the two time and two days together.
                            course[j].Date = `${course[j].Date} and ${course[j+1].Date}`
                            course[j].Time = `${course[j].Time} | ${course[j+1].Time}`
                          }
                        } else { // Else if the course length is odd, we run this logic instead.
                          newTableData.push(course[j])
                          j -= 1
                          continue

                          // The below code is the previous logic for more than 1 and is odd course length.
                          // However, there are way too much possible combination of course timetable and there are no standadized input.
                          // So we opt for just literally putting in raw data without combining like other courses for sanity sake.
                          // if (course[j].Time == course[j+1].Time){
                          //   course[j].Date = `${course[j].Date} and ${course[j+1].Date}`
                          // } else {
                          //   newTableData.push(course[j])
                          //   j -= 1
                          //   continue
                          // }
                        }

                        // Push into the variable.
                        newTableData.push(course[j])
                      } else { // Getting here would mean that the course length is 1 or lower. This would indicate a course with single block. Simply push it into the new variable since we don't have to combine anything.
                      newTableData.push(course[j])
                      }
                    }
                  }

                  // If this course is a ICPE course then run this logic
                  if(activeCourses[i].ID.substring(0,4) == 'ICPE'){
                    for(var j = 0; j < course.length; j++){
                      newTableData.push(course[j])
                    }
                  }

                }

                // After the processing is finished, we push it into the variable that frontend will read from.
                for (var j = 0; j < newTableData.length; j++){
                    this.tableData.push({id: newTableData[j].ID, name: newTableData[j].Name, day: newTableData[j].Date, time: newTableData[j].Time})
                }
                this.allLoading = false
            })
        })
    }
  }
</script>
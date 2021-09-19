
<template>

<h1>Current Trimester: {{trimester}}</h1>

<el-container>
    <el-form label-width="200px">
        <el-form-item label="Change Current Trimester">
            <el-select v-model="value" placeholder="Select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 10px;" @click="onChange">Change</el-button>
        </el-form-item>
    </el-form>
</el-container>

<el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      max-height="350"
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

<el-dialog title="Add New Schedule" v-model="addScheduleDialogVisible">

</el-dialog>

<div style="margin-top: 20px">
    <el-button type="primary" @click="addSchedule()">Add Schedule</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
    <el-button type="danger" @click="openDialog()">Delete Schedule</el-button>
</div>

</template>

<script>
import axios from 'axios'
import { defineComponent, ref } from 'vue'
  export default {
    data() {
      return {
        options: [],
        value: '',
        trimester: '',
        tableData: [],
        multipleSelection: [],
        addScheduleDialogVisible: false
      }
    },
    methods:{
        onChange(){
            axios.get('http://localhost:5000/getcurrenttrimester/changecurrenttrimester', {params:{current: this.trimester, new: this.value}})
            .then(response => {
                if(response.data == 'Successfully Changed'){
                    alert('Change successful. Refreashing the page (changes might take a few seconds to appear). Refresh again a few moments later if update does not appear.')
                    this.$router.go('/editcurrenttrimester')
                }
            })
        },
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
        addSchedule(){
            this.addScheduleDialogVisible = true
        }
    },
    mounted(){
        axios.get('http://localhost:5000/getcurrenttrimester/availabletrimesters')
        .then(response => {
            console.log(response.data)
            for(var i = 0; i< response.data.length; i++){
                this.options.push({value: response.data[i].trimester, label: response.data[i].trimester})
            }
        })

        axios.get('http://localhost:5000/getcurrenttrimester/currenttrimester')
        .then(response => {
            this.trimester = response.data[0].trimester

            axios.get('http://localhost:5000/getcurrenttrimester/timetable', {params:{trimester: this.trimester}})
            .then(response => {

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
                this.allLoading = false
            })
        })
    }
  }
</script>

<style>

</style>

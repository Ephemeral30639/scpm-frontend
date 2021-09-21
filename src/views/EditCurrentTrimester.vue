
<template>
<div v-loading="allLoading">
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
        <div style="margin-left: 150px; margin-right: 150px;">
            <el-form>
                <el-form-item label="Course ID">
                    <el-input placeholder="Course ID" v-model="input" maxlength="7"></el-input>
                </el-form-item>

                <el-radio-group v-model="dayRadio">
                    <el-container>
                        <el-radio label="Monday">Monday</el-radio>
                        <el-radio label="Tuesday">Tuesday</el-radio>
                        <el-radio label="Wednesday">Wednesday</el-radio>
                        <el-radio label="Thursday">Thursday</el-radio>
                    </el-container>

                    <el-container style="padding-top: 10px;">
                        <el-radio label="Friday">Friday</el-radio>
                        <el-radio label="Saturday">Saturday</el-radio>
                        <el-radio label="Sunday">Sunday</el-radio>
                    </el-container>
                </el-radio-group>

                <el-container style="padding-top: 20px; margin-bottom: 0em;">
                    <el-form-item label="Time">
                        <el-row>
                            <el-col :span="8">
                                <div>
                                    <el-input placeholder="Start" v-model="timeStart" maxlength="7"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div>
                                    <p style="margin-top: 0em;">TO</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div>
                                    <el-input placeholder="End" v-model="timeEnd" maxlength="7"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-container>
            </el-form>
            <el-button type="primary" @click="addSchedule()">Confirm</el-button>
        </div>
    </el-dialog>

    <div style="margin-top: 20px">
        <el-button type="primary" @click="addScheduleDialog()">Add Schedule</el-button>
        <el-button @click="toggleSelection()">Clear selection</el-button>
        <el-button type="danger" @click="deleteSchedule()">Delete Schedule</el-button>
    </div>
</div>
</template>

<script>
// For some reason, the usual {withcredentials: true} is very wonky is here's a better way to do it.
// I do NOT think we need to put "axios.defaults.withCredentials = true" every time we call axios but I do it just in case.
// https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
import axios from 'axios'
import { defineComponent, ref } from 'vue'
  export default defineComponent ({
    setup() {
        return {
        input: ref(''),
        }
    },
    data() {
      return {
        allLoading: true,
        options: [],
        value: '',
        trimester: '',
        tableData: [],
        multipleSelection: [],
        addScheduleDialogVisible: false,
        dayRadio: 0,

        timeStart: '',
        timeEnd: '',
      }
    },
    methods:{
        onChange(){
            axios.defaults.withCredentials = true
            axios.get('http://localhost:5000/getcurrenttrimester/changecurrenttrimester', {params:{current: this.trimester, new: this.value}})
            .then(response => {
                if(response.data == 'Successfully Changed'){
                    alert('Change successful. Refreashing the page (changes might take a few seconds to appear). Refresh again a few moments later if update does not appear.')
                    this.$router.go('/editcurrenttrimester')
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
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
            axios.defaults.withCredentials = true
            var time = `${this.timeStart} - ${this.timeEnd}`
            axios.post('http://localhost:5000/edittrimester/addschedule', null, {params:{id: this.input, date: this.dayRadio, time: time, trimester: this.trimester}})
            .then(response => {
                console.log(response.data)
                if(response.data == 'Scheduled Added'){
                    this.$notify.success({message: 'Schedule Successfully Added', duration: 6000})
                }
            })
        },
        addScheduleDialog(){
            this.addScheduleDialogVisible = true
        },
        deleteSchedule(){
            axios.defaults.withCredentials = true
            var coursesToDelete = []
            for (var i = 0; i < this.multipleSelection.length; i++){
                coursesToDelete.push(this.multipleSelection[i].id)
            }
            axios.post('http://localhost:5000/edittrimester/deleteschedule', null, {params:{trimester: this.trimester, courses: coursesToDelete}}, {withCredentials: true})
            .then(response => {
                if(response.data == 'Delete Successful'){
                    alert('Successfully Deleted Schedule (changes might take a few seconds to appear). Please wait a moment and refresh again to check.')
                    this.$router.go('/editcurrenttrimester')
                }
            })
        },
        timeSwitch(timeSlot){
            switch(timeSlot) {
                case "time1":
                    if(this.time1 == true){
                        this.time1Disabled = false
                    } else {
                        this.time1Disabled = true
                    }
                    break;
                case "time2":
                    if(this.time2 == true){
                        this.time2Disabled = false
                    } else {
                        this.time2Disabled = true
                    }
                    break;
                case "time3":
                    if(this.time3 == true){
                        this.time3Disabled = false
                    } else {
                        this.time3Disabled = true
                    }
                    break;
                case "time4":
                    if(this.time4 == true){
                        this.time4Disabled = false
                    } else {
                        this.time4Disabled = true
                    }
                    break;
                default:
                    // code block
            }
        }
    },
    mounted(){
        axios.defaults.withCredentials = true
        this.allLoading = true
        axios.get('http://localhost:5000/getuser', {withCredentials: true})
        .then(response => {
            if (response.data == "Not Logged In") {
              this.$message.error({message: 'You are not logged in. Please log in first.', duration: 4000})
              this.$router.push({path: '/login'})
            } else if (response.data.user.firstname != 'admin'){
                this.$message.error({message: 'You are not the administrator.', duration: 4000})
                this.$router.push({path: '/'})
            } else if (response.data.user.firstname == 'admin'){
                this.loading = false
            }
        })

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
  })
</script>

<style>
/* .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  } */
</style>
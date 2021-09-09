<template>
<h1>Current Trimester</h1>
<h3>T2 2020-2021</h3>

<el-table
    ref="multipleTable"
    :data="tableData"
    style="width: 100%"
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
  <div style="margin-top: 20px">
      <el-button type="primary" @click="enroll()">Enroll</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
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
      enroll(){
        //   console.log(this.multipleSelection)
        axios.post('http://localhost:5000/enroll', this.multipleSelection, {withCredentials: true})
        .then(response => {
            if (response.data == 'Success'){
                alert('Enroll Success')
                this.#router.push({path: '/'})
            }
        })
      }
    },

    mounted(){
        axios.get('http://localhost:5000/getcurrenttrimester', {withCredentials: true})
        .then(response => {
            console.log(response.data)

            if (response.data == "Not Logged In") {
              alert("You are not logged in. Please log in first.")
              this.$router.push({path: '/login'})
            }

            var data = response.data
            var previousCourse = [{id: data[0].ID, name: data[0].Name, day: data[0].Date, time: data[0].Time}]
            var newTableData = []
            for (var i = 1; i < data.length; i++){
                if (data[i].ID == previousCourse[0].id){
                    var time = previousCourse[0].time
                    var day = previousCourse[0].day
                    
                    if (previousCourse[0].time == data[i].Time){
                        previousCourse[0].day = day.concat(` and ${data[i].Date}`)
                        newTableData.push(previousCourse)
                        previousCourse = [{}]
                    }
                    else {
                        previousCourse[0].day = day.concat(` and ${data[i].Date}`)
                        previousCourse[0].time = time.concat(` | ${data[i].Time}`)
                        newTableData.push(previousCourse)
                        previousCourse = [{}]
                    }
                }
                else {
                    previousCourse = [{id: data[i].ID, name: data[i].Name, day: data[i].Date, time: data[i].Time}]
                }
            }
            for (var j = 0; j < newTableData.length; j++) {
                this.tableData.push({id: newTableData[j][0].id, name: newTableData[j][0].name, day: newTableData[j][0].day, time: newTableData[j][0].time})
            }
        })
    }
  }
</script>
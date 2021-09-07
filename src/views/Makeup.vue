<template>
<el-row align="bottom">
  <el-col :span="8">
    <div class="grid-content bg-purple" style="text-align:left; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px">
      <el-autocomplete
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="Select the cancelled class"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
  </el-col>
  <el-col :span="8">
    <div class="grid-content bg-purple-light" style="padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px">
      <h1 style="vertical-align:bottom;">Makeup Finder</h1>
    </div>
  </el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>

  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
      label=""
      width="180">
    </el-table-column>
    <el-table-column
      prop="mon"
      label="Mon"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tue"
      label="Tue">
    </el-table-column>
    <el-table-column
      prop="wed"
      label="Wed">
    </el-table-column>
    <el-table-column
      prop="thurs"
      label="Thurs">
    </el-table-column>
    <el-table-column
      prop="fri"
      label="Fri">
    </el-table-column>
    <el-table-column
      prop="sat"
      label="Sat">
    </el-table-column>
    <el-table-column
      prop="sun"
      label="Sun">
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
export default defineComponent({
  data() {
      return {
        tableData: [{
          time: '8:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        }, {
          time: '9:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '10:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '11:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '12:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '13:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '14:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '15:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '16:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '17:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '18:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '19:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '20:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '21:00',
          mon: '',
          tue: '',
          wed: '',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },]
      }
    },
    setup() {
    const restaurants = ref([]);
    const querySearch = (queryString, cb) => {
      var results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value;
        // call callback function to return suggestions
        cb(results);
    };
    const createFilter = (queryString) => {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    };
    const loadAll = () => {
      // This function is called immediately when user loads the page.
      // This is probably where you connect backend to ask for active courses in the active trimeester.
      axios.get('http://localhost:5000/makeup/getactivecourses')
      .then((response) => {
        var data = []
        for (var i = 0; i < response.data.length; i++){
          data.push({value: response.data[i].id})
        }
        restaurants.value = data
        return
      })
    };
    onMounted(() => {
      loadAll();
    });
    return {
      restaurants,
      state1: ref(''),
      state2: ref(''),
      querySearch,
      createFilter,
      loadAll
    };
  },
  methods: {
    handleSelect (item) {
      // This function is called when the user selects from the suggested output.
      // This is probably where you edit the table to mark x or o depending on what they chose.
      axios.get('http://localhost:5000/makeup/getmakeup', {params:{course: item.value}})
      .then(response => {
        var data = response.data
        console.log(data)

        // Clear the table first.
        for (var x = 0; x < this.tableData.length; x++){
          this.tableData[x].mon = ''
          this.tableData[x].tue = ''
          this.tableData[x].wed = ''
          this.tableData[x].thurs = ''
          this.tableData[x].fri = ''
          this.tableData[x].sat = ''
          this.tableData[x].sun = ''
        }

        for (var i = 0; i < data.length; i++){

          if (data[i].Date == 'Monday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].mon = 'X';
            }
          }

          if (data[i].Date == 'Tuesday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].tue = 'X';
            }
          }

          if (data[i].Date == 'Wednesday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].wed = 'X';
            }
          }

          if (data[i].Date == 'Thursday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].thurs = 'X';
            }
          }

          if (data[i].Date == 'Friday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].fri = 'X';
            }
          }

          if (data[i].Date == 'Saturday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].sat = 'X';
            }
          }

          if (data[i].Date == 'Sunday'){
            // Take the time
            var time = data[i].Time

            // Split it to get start and end time
            var startEndTime = time.split('-')

            // Format the spaces out
            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            // Get startTime and Duration
            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

            var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
            for (var j = 0; j < duration; j++){
              this.tableData[foundIndex+j].sun = 'X';
            }
          }

        }
      })
    }
  }
});
</script>

<style>
  /* .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
</style>
<template>
<el-row align="bottom">
  <el-col :span="8">
    <div class="grid-content bg-purple" style="text-align:left; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px">
      <el-autocomplete
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="Select the cancelled class"
        :trigger-on-focus="true"
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
      width="180"
      align="right">
    </el-table-column>
    <el-table-column
      prop="mon"
      label="Mon"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="tue"
      label="Tue"
      align="center">
    </el-table-column>
    <el-table-column
      prop="wed"
      label="Wed"
      align="center">
    </el-table-column>
    <el-table-column
      prop="thurs"
      label="Thurs"
      align="center">
    </el-table-column>
    <el-table-column
      prop="fri"
      label="Fri"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sat"
      label="Sat"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sun"
      label="Sun"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
export default defineComponent({
  data() {
      return {
        trimester: '',
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
      axios.get('http://localhost:5000/getcurrenttrimester/currenttrimester')
        .then(response => {
            var trimester = response.data[0].trimester

            axios.get('http://localhost:5000/makeup/getactivecourses', {params:{trimester: trimester}})
            .then((response) => {
              var data = []
              for (var i = 0; i < response.data.length; i++){
                data.push({value: response.data[i].id})
              }
              restaurants.value = data
              return
            })
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
      axios.get('http://localhost:5000/makeup/getmakeup', {params:{course: item.value, trimester: this.trimester}})
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
          if (data[i].date.includes('and') && data[i].time.includes(' | ') == false){
            var days = data[i].date.split(' and ')
            var time = data[i].time

            var startEndTime = time.split('-')

            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            var foundTimeIndex = this.tableData.findIndex(x => x.time == startTime);

            for (var j = 0; j < days.length; j++){
              switch(days[j]) {
                case 'Monday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].mon = 'X';
                  }
                  break;
                case 'Tuesday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].tue = 'X';
                  }
                  break;
                case 'Wednesday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].wed = 'X';
                  }
                  break;
                case 'Thursday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].thurs = 'X';
                  }
                  break;
                case 'Friday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].fri = 'X';
                  }
                  break;
                case 'Saturday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].sat = 'X';
                  }
                  break;
                case 'Sunday':
                  for (var m = 0; m < duration; m++){
                    this.tableData[foundTimeIndex+m].sun = 'X';
                  }
                  break;
              }
            }
          }

          if (data[i].date.includes('and') && data[i].time.includes(' | ') == true){
            var days = data[i].date.split(' and ')
            var times = data[i].time.split(' | ')

            var startEndTime1 = times[0].split('-')
            var startEndTime2 = times[1].split('-')

            startEndTime1[0] = startEndTime1[0].replace(' ','')
            startEndTime1[1] = startEndTime1[1].replace(' ','')

            startEndTime2[0] = startEndTime2[0].replace(' ','')
            startEndTime2[1] = startEndTime2[1].replace(' ','')

            var startTime1 = String(startEndTime1[0])
            var startTime2 = String(startEndTime2[0])
            startTime1 = startTime1.concat(':00')
            startTime2 = startTime2.concat(':00')

            var duration1 = parseInt(startEndTime1[1]) - parseInt(startEndTime1[0])
            var duration2 = parseInt(startEndTime2[1]) - parseInt(startEndTime2[0])

            var foundTimeIndex1 = this.tableData.findIndex(x => x.time == startTime1)
            var foundTimeIndex2 = this.tableData.findIndex(x => x.time == startTime2)

            for (var j = 0; j < days.length; j++){

              if (days[j] == "Monday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].mon = 'X';
                }
              }

              if (days[j] == "Monday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].mon = 'X';
                }
              }

              if (days[j] == "Tuesday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].tue = 'X';
                }
              }

              if (days[j] == "Tuesday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].tue = 'X';
                }
              }

              if (days[j] == "Wednesday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].wed = 'X';
                }
              }

              if (days[j] == "Wednesday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].wed = 'X';
                }
              }

              if (days[j] == "Thursday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].thurs = 'X';
                }
              }

              if (days[j] == "Thursday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].thurs = 'X';
                }
              }

              if (days[j] == "Friday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].fri = 'X';
                }
              }

              if (days[j] == "Friday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].fri = 'X';
                }
              }

              if (days[j] == "Saturday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].sat = 'X';
                }
              }

              if (days[j] == "Saturday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].sat = 'X';
                }
              }

              if (days[j] == "Sunday" && j == 0){
                for (var m = 0; m < duration1; m++){
                  this.tableData[foundTimeIndex1+m].sun = 'X';
                }
              }

              if (days[j] == "Sunday" && j == 1){
                for (var m = 0; m < duration2; m++){
                  this.tableData[foundTimeIndex2+m].sun = 'X';
                }
              }
            }
          }

          if (data[i].date.includes('and') == false && data[i].time.includes(' | ') == false){
            var day = data[i].date
            var time = data[i].time

            var startEndTime = time.split('-')

            startEndTime[0] = startEndTime[0].replace(' ','')
            startEndTime[1] = startEndTime[1].replace(' ','')

            var startTime = String(startEndTime[0])
            startTime = startTime.concat(':00')
            var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

            var foundTimeIndex = this.tableData.findIndex(x => x.time == startTime);

            switch(day) {
              case 'Monday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].mon = 'X';
                }
                break;
              case 'Tuesday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].tue = 'X';
                }
                break;
              case 'Wednesday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].wed = 'X';
                }
                break;
              case 'Thursday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].thurs = 'X';
                }
                break;
              case 'Friday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].fri = 'X';
                }
                break;
              case 'Saturday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].sat = 'X';
                }
                break;
              case 'Sunday':
                for (var m = 0; m < duration; m++){
                  this.tableData[foundTimeIndex+m].sun = 'X';
                }
                break;
            }
          }
        }

        // for (var i = 0; i < data.length; i++){

        //   if (data[i].Date == 'Monday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     // Find the Correct Time according to the data we got
        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     // Loop according to the duration. Start from startTime.
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].mon = 'X';
        //     }
        //   }

        //   if (data[i].Date == 'Tuesday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].tue = 'X';
        //     }
        //   }

        //   if (data[i].Date == 'Wednesday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].wed = 'X';
        //     }
        //   }

        //   if (data[i].Date == 'Thursday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].thurs = 'X';
        //     }
        //   }

        //   if (data[i].Date == 'Friday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].fri = 'X';
        //     }
        //   }

        //   if (data[i].Date == 'Saturday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].sat = 'X';
        //     }
        //   }

        //   if (data[i].Date == 'Sunday'){
        //     // Take the time
        //     var time = data[i].Time

        //     // Split it to get start and end time
        //     var startEndTime = time.split('-')

        //     // Format the spaces out
        //     startEndTime[0] = startEndTime[0].replace(' ','')
        //     startEndTime[1] = startEndTime[1].replace(' ','')

        //     // Get startTime and Duration
        //     var startTime = String(startEndTime[0])
        //     startTime = startTime.concat(':00')
        //     var duration = parseInt(startEndTime[1]) - parseInt(startEndTime[0])

        //     console.log(`${startEndTime[0].replace(' ','')} ${startEndTime[1].replace(' ','')}`)

        //     var foundIndex = this.tableData.findIndex(x => x.time == startTime);
            
        //     for (var j = 0; j < duration; j++){
        //       this.tableData[foundIndex+j].sun = 'X';
        //     }
        //   }

        // }
      })
    }
  },
  mounted(){
    axios.get('http://localhost:5000/getcurrenttrimester/currenttrimester')
        .then(response => {
            this.trimester = response.data[0].trimester
        })
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
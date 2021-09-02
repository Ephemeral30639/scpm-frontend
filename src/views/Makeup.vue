<template>
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
  export default {
    data() {
      return {
        tableData: [{
          time: '8.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        }, {
          time: '9.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '10.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '11.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '12.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '13.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '14.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '15.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '16.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '17.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '18.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '19.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '20.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },{
          time: '21.00',
          mon: 'O',
          tue: 'O',
          wed: 'X',
          thurs: '',
          fri: '',
          sat: '',
          sun: ''
        },]
      }
    }
  }
</script>
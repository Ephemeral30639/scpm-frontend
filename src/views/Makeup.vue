<template>

<!-- Top Navigation Bar -->
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><a href="/">Home</a></el-menu-item>
  <el-submenu index="2">
    <template #title>Features</template>
    <el-menu-item index="2-1">Course and Credit Tracking</el-menu-item>
    <el-menu-item index="2-2">Course Suggestions</el-menu-item>
    <el-menu-item index="2-3"><a href="/GPCC">Generation Per Course Counter</a></el-menu-item>
    <el-menu-item index="2-4"><a href="/Makeup">Makeup Finder</a></el-menu-item>
  </el-submenu>
  <el-menu-item index="3"><a href="/login">Login</a></el-menu-item>
  <el-menu-item index="4"><a href="/register">Register</a></el-menu-item>
</el-menu>

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
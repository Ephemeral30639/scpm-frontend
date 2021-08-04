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
    <el-menu-item index="2-4">Makeup Finder</el-menu-item>
  </el-submenu>
  <el-menu-item index="3"><a href="/login">Login</a></el-menu-item>
  <el-menu-item index="4"><a href="/register">Register</a></el-menu-item>
</el-menu>



  <el-table
    :data="tableData"
    :default-sort = "{prop: 'id', order: 'asending'}"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="credit"
      label="Credit">
    </el-table-column>
        <el-table-column
      prop="gen"
      label="Generation count">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: 'EGCI204',
          name: 'Engineering Mechanics',
          credit: '4',
          gen: '12'
        }, {
          id: 'EGCI321',
          name: 'Database Systems',
          credit: '4',
          gen: '10'
        },{
          id: 'EGCI252',
          name: 'System Programming',
          credit: '4',
          gen: '5'
        },{
          id: 'ICMA215',
          name: 'Calculus',
          credit: '4',
          gen: '8'
        },{
          id: 'EGCI212',
          name: 'Programming Techniques',
          credit: '4',
          gen: '12'
        },{
          id: 'EGCI100',
          name: 'Introduction to computer engineering',
          credit: '1',
          gen: '25'
        },{
          id: 'EGCI463',
          name: 'Pattern Recognition',
          credit: '4',
          gen: '5'
        },{
          id: 'EGCI233',
          name: 'Digital Circuit Design Lab ',
          credit: '1',
          gen: '16'
        },{
          id: 'EGCI234',
          name: 'Digital Circuit Design',
          credit: '4',
          gen: '22'
        },{
          id: 'EGCI321',
          name: 'Database Systems ',
          credit: '4',
          gen: '9'
        },{
          id: 'EGCI201',
          name: 'Discrete Mathematics',
          credit: '4',
          gen: '23'
        },]
      }
    }
  }
</script>
<style>

</style>
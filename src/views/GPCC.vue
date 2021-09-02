<template>
  <el-table
    :data="tableData"
    :default-sort = "{prop: 'id', order: 'asending'}"
    stripe
    style="width: 100%"
    >
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
      prop="gen598"
      label="Generation 598">
    </el-table-column>
        <el-table-column
      prop="gen608"
      label="Generation 608">
    </el-table-column>
            <el-table-column
      prop="gen618"
      label="Generation 618">
    </el-table-column>
            <el-table-column
      prop="gen628"
      label="Generation 628">
    </el-table-column>
            <el-table-column
      prop="gen638"
      label="Generation 638">
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
          gen598: '4',
          gen608: '12',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        }, {
          id: 'EGCI321',
          name: 'Database Systems',
          gen598: '14',
          gen608: '10',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI252',
          name: 'System Programming',
          gen598: '25',
          gen: '19',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'ICMA215',
          name: 'Calculus',
          gen598: '24',
          gen608: '8',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI212',
          name: 'Programming Techniques',
          gen598: '24',
          gen608: '12',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI100',
          name: 'Introduction to computer engineering',
          gen598: '22',
          gen608: '25',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI463',
          name: 'Pattern Recognition',
          gen598: '25',
          gen608: '15',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI233',
          name: 'Digital Circuit Design Lab ',
          gen598: '22',
          gen608: '16',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI234',
          name: 'Digital Circuit Design',
          gen598: '25',
          gen608: '22',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI321',
          name: 'Database Systems ',
          gen598: '22',
          gen608: '9',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },{
          id: 'EGCI201',
          name: 'Discrete Mathematics',
          gen598: '12',
          gen608: '23',
          gen618: '12',
          gen628: '12',
          gen638: '0'
        },]
      }
    }
  }
</script>
<style>
  .el-table{
    color: #505050;
    }
</style>
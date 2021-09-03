<template>
<el-row :gutter="5">
  <el-col :span="2">
  <div class="grid-content"></div>
  <el-autocomplete
    class="inline-input"
    v-model="state2"
    :fetch-suggestions="querySearch"
    placeholder="Please Input"
    :trigger-on-focus="false"
    @select="handleSelect"
  ></el-autocomplete></el-col>
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
export default defineComponent({
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
      return [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" }
        ];
    };
    const handleSelect = (item) => {
      // This function is called when the user selects from the suggested output.
      // This is probably where you edit the table to mark x or o depending on what they chose.
      console.log(item);
    };
    onMounted(() => {
      restaurants.value = loadAll();
    });
    return {
      restaurants,
      state1: ref(''),
      state2: ref(''),
      querySearch,
      createFilter,
      loadAll,
      handleSelect,
    };
  },
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
});
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
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
  }
</style>
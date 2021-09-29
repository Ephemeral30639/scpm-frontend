<template>
<div v-loading='allLoading'>
  <el-input v-model="search" size="large" placeholder="Type to search" />

    <el-table
      :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
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
        prop="gen60"
        label="Generation 60">
      </el-table-column>
      <el-table-column
        prop="gen61"
        label="Generation 61">
      </el-table-column>
      <el-table-column
        prop="gen63"
        label="Generation 63">
      </el-table-column>
      <el-table-column
        prop="gen64"
        label="Generation 64">
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
export default defineComponent({
  data() {
      return {
        allLoading: true,
        search: '',
        tableData: []
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
      // 1 (start)
      // This function is called immediately when user loads the page.
      // This is probably where you connect backend to ask for active courses in the active trimeester.
      axios.get('http://localhost:5000/gpcc')
      .then((response) => {
        var data = response.data
        var courses = []
        for (var i = 0; i < data.length; i++){
          courses.push({value: data[i].Course_ID})
        }
        restaurants.value = courses
        return
      })
    };
    onMounted(() => {
      // loadAll();
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
      this.search = item.value
    }
  },
  mounted() {
    this.allLoading = true
    axios.get('http://localhost:5000/gpcc')
    .then(response => {
      var data = response.data
      // Your Code here.
      for (var i = 0; i < data.length; i++){
        this.tableData.push({id: response.data[i].Course_ID, name: response.data[i].Name,gen60: response.data[i].Gen60, gen61: response.data[i].Gen61, gen63: response.data[i].Gen63, gen64: response.data[i].Gen64})
      }
      this.allLoading = false
    })
  }
});
</script>

<style>
  .el-table{
    color: #505050;
    }
</style>
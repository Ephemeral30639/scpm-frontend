<template>
<el-input v-model="search" size="mini" placeholder="Type to search" />

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
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
export default defineComponent({
  data() {
      return {
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
      this.search = item.value
    }
  },
  mounted() {
    axios.get('http://localhost:5000/gpcc')
    .then(response => {
      var data = response.data
      // Your Code here.
      for (var i = 0; i < data.length; i++){
        this.tableData.push({id: response.data[i].Course_ID, name: response.data[i].Name,gen598: response.data[i].Gen598, gen608: response.data[i].Gen608,gen618: response.data[i].Gen618,gen628: response.data[i].Gen628, gen638: response.data[i].Gen638})
      }
    })
  }
});
</script>

<style>
  .el-table{
    color: #505050;
    }
</style>
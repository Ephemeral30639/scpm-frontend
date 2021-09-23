<template>
    <h1>Course Comments</h1>
    <el-container style="margin-right: 150px; margin-left: 150px">

        <el-aside width="200px">
            <el-header style="background-color: #d3dce6;">
                <b style="font-size: 30px">Courses</b>
            </el-header>
            <el-input v-model="filterText" placeholder="Filter keyword"></el-input>
            <div>
                <el-scrollbar height="50vh">
                    <el-tree
                    ref="tree"
                    :data="courses"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ></el-tree>
                </el-scrollbar>
            </div>
        </el-aside>

        <el-container>
            <el-header>
                <b style="font-size: 25px">Comments</b>
            </el-header>
            <el-main>
                <transition name="el-zoom-in-center">
                    <h1 style="margin-top: 0em; word-break: keep-all;" v-show="show"></h1>
                </transition>
                <transition name="el-zoom-in-center">
                    <p style="word-break: keep-all; font-size: 20px; margin: 20px; text-align: justify;" v-show="show"></p>
                </transition>
            </el-main>
            <el-footer>
                <el-container>
                    <el-input
                        v-model="commmentInput"
                        placeholder="Your Comment Here"
                        style="margin-top: 11px;"
                    >
                    </el-input>
                    <el-button type="primary" icon="el-icon-s-promotion" style="margin-top: 12px; margin-left: 10px;"></el-button>
                </el-container>
            </el-footer>
        </el-container>

        <el-aside width="300px">
            <h2 style="padding-top: 70%;">{{courseDisplay.ID}}</h2>
            <p>{{courseDisplay.Name}}</p>
        </el-aside>
        
    </el-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
          courses: [],
          show: true,
          filterText: '',
          courseDisplay: {},
          commmentInput: ''
      };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    mounted() {
        axios.get('http://localhost:5000/comments/getallcourses')
        .then(response => {
            for(var i = 0; i < response.data.length; i++){
                this.courses.push({label: response.data[i].ID})
            }
        })
    },
    methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleNodeClick(data) {
            axios.get('http://localhost:5000/comments/getcoursename', {params:{course: data.label}})
            .then(response => {
                this.courseDisplay = {ID: data.label, Name: response.data[0].Name}
            })
        },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        }
    }
  }
</script>

<style>
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    max-height: 60vh;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /* .center {
  justify-content: center;
  align-items: center;
  } */
</style>
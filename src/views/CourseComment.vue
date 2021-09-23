<template>
    <h1>Course Comments</h1>
    <el-container style="margin-right: 150px; margin-left: 150px; max-height: 70vh;">

        <el-aside width="200px">
            <el-header style="background-color: #d3dce6;">
                <b style="font-size: 30px">Courses</b>
            </el-header>
            <el-input v-model="filterText" placeholder="Filter keyword"></el-input>
            <div>
                <el-scrollbar height="56.8vh">
                    <el-tree
                    ref="tree"
                    :data="courses"
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
            <el-main style="height: 70vh;">
                <!-- <transition name="el-zoom-in-center">
                    <h1 style="margin-top: 0em; word-break: keep-all;" v-show="show"></h1>
                </transition>
                <transition name="el-zoom-in-center">
                    <p style="word-break: keep-all; font-size: 20px; margin: 20px; text-align: justify;" v-show="show"></p>
                </transition> -->
                
                <div v-for="o in commentData.length" :key="o" class="text item">
                    <el-card class="box-card">
                        <template #header>
                            <el-container>
                                <p style="text-align: left;">{{commentData[parseInt(o-1)].date}}&nbsp;</p>
                                <em style="text-align: left;">{{commentData[parseInt(o-1)].time}}</em>
                                <b>&nbsp;({{commentData[parseInt(o-1)].studentID}})</b>
                            </el-container>
                        </template>
                        <el-container>
                            <p style="font-size: 20px;">{{commentData[parseInt(o-1)].comment}}</p>
                        </el-container>
                    </el-card>
                    <el-divider></el-divider>
                </div>
                
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
            <h2 style="padding-top: 30vh;">{{courseDisplay.ID}}</h2>
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
          commmentInput: '',
          commentData: []
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

            // List of available Locales
            // https://stackoverflow.com/a/9893752/12861725
            // Locale Options
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
            axios.get('http://localhost:5000/comments/getcoursecomments', {params:{course: data.label}})
            .then(response => {

                var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
                this.commentData = []

                for(var i = 0; i < response.data.length; i++){
                    var timestamp = new Date(parseInt(response.data[i].timestamp))
                    this.commentData.push({
                        comment: response.data[i].comment,
                        date: timestamp.toLocaleDateString('en-US', options).substring(5),
                        time: timestamp.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'}),
                        studentID: response.data[i].studentID
                    })
                }
                console.log(this.commentData)
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

  .centered { 
    display: grid;
    flex-direction: column;
    justify-content: center;
  }
</style>
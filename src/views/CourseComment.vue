<template>
    <h1>Course Comments</h1>
    <el-container style="margin-right: 150px; margin-left: 150px; max-height: 70vh;">

        <el-aside width="200px">
            <el-header style="background-color: #d3dce6;">
                <b style="font-size: 30px">Courses</b>
            </el-header>
            <div v-loading="coursesLoading">
                <el-input v-model="filterText" placeholder="Filter Courses"></el-input>
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
            </div>
        </el-aside>

        <el-container>
            <el-header>
                <b style="font-size: 25px">Comments</b>
            </el-header>
            <el-main style="height: 70vh;" v-loading="commentDisplayLoading">
                
                <div v-for="o in commentData.length" :key="o" class="text item" v-loading="commentDisplayLoading">
                    <el-card class="box-card" shadow="always">
                        <template #header>
                            <el-container>
                                <p style="text-align: left;">{{commentData[parseInt(o-1)].date}}&nbsp;</p>
                                <em style="text-align: left;">{{commentData[parseInt(o-1)].time}}</em>
                                <b>&nbsp;({{commentData[parseInt(o-1)].studentID}})</b>
                            </el-container>
                        </template>
                        <el-container>
                            <p style="font-size: 20px; text-align: left;">{{commentData[parseInt(o-1)].comment}}</p>
                        </el-container>
                    </el-card>
                    <el-divider></el-divider>
                </div>
                
            </el-main>
            <el-footer v-loading="footerLoading">
                <el-container>
                    <el-input
                        v-model="commmentInput"
                        placeholder="Your Comment Here"
                        style="margin-top: 11px;"
                        :disabled="commentInputDisabled"
                    >
                    </el-input>
                    <el-button type="primary" icon="el-icon-s-promotion" style="margin-top: 12px; margin-left: 10px;" :disabled="commentSendButtonDisabled" @click="sendComment()"></el-button>
                </el-container>
            </el-footer>
        </el-container>

        <el-aside width="300px" v-loading="courseInfoDisplayLoading">
            <h2 style="padding-top: 30vh;">{{courseDisplay.ID}}</h2>
            <p>{{courseDisplay.Name}}</p>
        </el-aside>
        
    </el-container>
</template>

<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
export default {
    data() {
      return {
          courses: [],
          show: true,
          filterText: '',
          courseDisplay: {},
          commmentInput: '',
          commentData: [],
          coursesLoading: true,
          footerLoading: false,
          commentDisplayLoading: false,
          courseInfoDisplayLoading: false,
          commentInputDisabled: true,
          commentSendButtonDisabled: true,
          loggedIn: false,
          studentID: ''
      };
    },
    watch: {
        filterText(val) {
            // Watch the filter input. If value changes, update the filtering of the tree.
            this.$refs.tree.filter(val)
        },
        commmentInput(val){
            // A function to watch the comment input area.
            // If it is empty, disable the send button. Otherwise, enable it.
            if(val != ''){
                this.commentSendButtonDisabled = false
            } else {
                this.commentSendButtonDisabled = true
            }
        }
    },
    mounted() {
        axios.defaults.withCredentials = true

        // Load all the courses
        axios.get('https://scpm2021backend.herokuapp.com/comments/getallcourses')
        .then(response => {
            if(response.data == 'Error'){
              this.$message.error({message: 'Failed to load the courses. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
            }
            for(var i = 0; i < response.data.length; i++){
                this.courses.push({label: response.data[i].ID})
            }
            this.coursesLoading = false
        })

        // Get StudentID
        // Also serve as a way to check if user can comment or not (must be logged in to comment)
        axios.get('https://scpm2021backend.herokuapp.com/getuser')
        .then(response => {
            if (response.data != "Not Logged In") {
                this.loggedIn = true
                this.studentID = response.data.user.studentID
            }
        })
    },
    methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleNodeClick(data) {
            axios.defaults.withCredentials = true
            this.courseInfoDisplayLoading = true
            this.commentDisplayLoading = true
            this.commentInputDisabled = true
            this.coursesLoading = true

            // Get course name to display on the right side.
            axios.get('https://scpm2021backend.herokuapp.com/comments/getcoursename', {params:{course: data.label}})
            .then(response => {
                if(response.data == 'Error'){
                    this.$message.error({message: 'Failed to load the course name. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                    return
                }
                this.courseDisplay = {ID: data.label, Name: response.data[0].Name}
            })

            // List of available Locales
            // https://stackoverflow.com/a/9893752/12861725
            // Locale Options
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
            axios.get('https://scpm2021backend.herokuapp.com/comments/getcoursecomments', {params:{course: data.label}})
            .then(response => {
                if(response.data == 'Error'){
                    this.$message.error({message: 'Failed to load course comments. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                    return
                }
                
                // If the selected Course has no comment, warn the user.
                if(response.data == ''){
                    this.$alert('No comments in this course.', 'No Comments!', {center: true})
                    this.commentData = []
                    this.courseInfoDisplayLoading = false
                    this.commentDisplayLoading = false
                    this.coursesLoading = false
                    if(this.loggedIn == false){
                        this.commentInputDisabled = true
                    } else {
                        this.commentInputDisabled = false
                    }
                    return
                }

                // Reset commentData whenever we load new comment. Otherwise, it stacks up.
                this.commentData = []
                var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }

                // For each comments found, parse the timestamp back to human language, pre-process the data, push it to commentData for display.
                for(var i = 0; i < response.data.length; i++){
                    var timestamp = new Date(parseInt(response.data[i].timestamp))
                    this.commentData.push({
                        comment: response.data[i].comment,
                        date: timestamp.toLocaleDateString('en-US', options).substring(5),
                        time: timestamp.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'}),
                        studentID: response.data[i].studentID
                    })
                }
                this.courseInfoDisplayLoading = false
                this.commentDisplayLoading = false
                this.coursesLoading = false

                // If user is logged in, enable the comment input area.
                if(this.loggedIn){
                    this.commentInputDisabled = false
                }
            })
        },
        sendComment(){
            this.coursesLoading = true
            this.footerLoading = true
            var commentID = uuidv4()
            var timestamp = Date.now()
            axios.post('https://scpm2021backend.herokuapp.com/comments/inputcomment', null, {params:{commentID: commentID, courseID: this.courseDisplay.ID, comment: this.commmentInput, timestamp: timestamp, studentID: 'Not Anonymous'}})
            .then(response => {
                if(response.data == 'Error'){
                    this.$message.error({message: 'Failed to comment. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                    return
                }

                // If comment was a success, push the comment to commentData to visualize succession.
                if (response.data == 'Comment Successful'){
                    this.$message.success({message: 'Successfully Commented', duration: 4000})
                    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
                    var timestampToPush = new Date (parseInt(timestamp))
                    this.commentData.push({
                        comment: this.commmentInput,
                        date: timestampToPush.toLocaleDateString('en-US', options).substring(5),
                        time: timestampToPush.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'}),
                        studentID: this.studentID
                    })
                    this.commmentInput = ''
                }
                this.footerLoading = false
                this.coursesLoading = false
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
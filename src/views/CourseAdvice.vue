<template>
    <h1>Course Advice</h1>
    <el-container style="margin-right: 250px; margin-left: 250px">

        <el-aside width="200px">
            <el-header style="background-color: #d3dce6;">
                <b style="font-size: 30px">Categories</b>
            </el-header>
            <el-tree
            :data="adviceCategory"
            :props="defaultProps"
            @node-click="handleNodeClick"
            v-loading="loading"
            ></el-tree>
        </el-aside>

        <el-container>
            <el-header>
                <b style="font-size:25px">Senior Advice</b>
            </el-header>
            <el-main>
                <transition name="el-zoom-in-center">
                    <h1 style="margin-top: 0em; word-break: keep-all;" v-show="show">{{adviceToShow.courseID}}: {{adviceToShow.name}}</h1>
                </transition>
                <transition name="el-zoom-in-center">
                    <p style="word-break: keep-all; font-size: 20px; margin: 20px; text-align: justify;" v-show="show">{{adviceToShow.adviceText}}</p>
                </transition>
            </el-main>
        </el-container>
        
    </el-container>

    <!-- <el-dialog title="Information" v-model="dialogTableVisible">
        <h1 style="margin-top: 0em; word-break: keep-all;">{{adviceConent.title}}</h1>
        <p style="word-break: keep-all; font-size: 20px;">{{adviceConent.description}}</p>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="dialogTableVisible = false">Close</el-button>
            </span>
        </template>
    </el-dialog> -->
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        adviceContent: [],
        adviceToShow: {},
        adviceCategory: [],
        show: false,
        dialogTableVisible: false,
        loading: true,
        activeIndex: '2',
        loading: true,
      };
    },

    mounted() {
        axios.get('http://localhost:5000/advice/getalladvice')
        .then(response => {
            if(response.data == 'Error'){
              this.$message.error({message: 'Failed to load advices. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
              return
            }
            // Store the raw data
            var data = response.data

            // Find out how many categories are there in the data
            const ids = data.map(o => o.category)
            const categories = data.filter(({category}, index) => !ids.includes(category, index + 1))

            var filteredData = []
            var dataToPush = []

            for(var i = 0; i < categories.length; i++){
                // For each category, filter the appropriate coureses of that category
                filteredData = data.filter(x => x.category == categories[i].category)
                
                //for each courese in a category, push it into a variable.
                for(var j = 0; j < filteredData.length; j++){
                    dataToPush.push({label: filteredData[j].courseID})
                    this.adviceContent.push({courseID: filteredData[j].courseID, name: filteredData[j].Name, text: filteredData[j].adviceText})
                }
                
                // Push all the data (category and course under each category) into the display variable
                this.adviceCategory.push({label: categories[i].category, children: dataToPush})

                // Reset the variable for another round
                dataToPush = []
            }
            // Once the data is processed, turn of the loading animation
            this.loading = false
        })
    },
    methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        transition(){
          this.show = true
        },
        changeData(label){
          // Unfortunately, whenever you click on a tree, it runs the "handleNodeClick" function.
          // It will ALWAYS throw an error whenever you click on a category, hence the try catch.
          try{
            this.adviceToShow = {}
            var filteredData = this.adviceContent.filter(x => x.courseID == label)
            this.adviceToShow = {courseID: filteredData[0].courseID, name: filteredData[0].name, adviceText: filteredData[0].text}
            this.transition()
          } catch {
            this.show = false
          }
        },
        handleNodeClick(data) {
          this.show = false
          // Without setting a timeout, the data change too quick and the transition won't have enough time to play its animation.
          setTimeout(this.changeData, 200, data.label)
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
</style>
<template>
    <!-- Search button -->
    <el-tooltip class="item" effect="dark" content="Search a taken course" placement="top">
        <el-button type="info" icon="el-icon-search" circle @click="searchDrawerVisibility = true" style="margin-right:10px;"></el-button>
    </el-tooltip>

    <!-- Search drawer -->
    <el-drawer title="Search a taken course" v-model="searchDrawerVisibility" direction="rtl" size="30%" style="text-align:left;" custom-class="demo-drawer" ref="drawer">
        <!-- Drawer body -->

        <!-- input -->
        <div style="margin-bottom:20px;">
            <p class="sub-title" style="text-align: left; font-size: 14px; margin-bottom: 0px;">Check if you have already taken a course</p>
            <el-input v-model="searchInput" placeholder="Enter a Course ID" v-on:keyup.enter="search(AllTakenCourses.value)" clearable></el-input>
        </div>

        <!-- alert message -->
        <el-alert title="Spelling check" description="Please check your spelling carefully (case insensitive)" type="warning" :closable="true" show-icon style="margin-bottom:20px;"></el-alert>

        <!-- Drawer footer -->
        <div class="drawer__footer">
            <div>
            <el-button @click="this.searchDrawerVisibility = false">Cancel</el-button>
            <el-button type="info" @click="search()">Search</el-button>
            </div>
        </div>
    </el-drawer>

</template>

<script>
import { defineComponent, ref } from 'vue'
export default  defineComponent({
    props: {
        AllTakenCourses: Object
    },
    data() {
      return {
        searchDrawerVisibility: false,
        searchInput: ref('')
      };
    },
    methods: {
        disableButton() {
            if(this.searchInput.length == 0)
                return true
            else
                return false
        },
        search(){
            if (this.searchInput.length != 7){
                this.$message.error({message: 'Invalid input. Please type the correct (7 characters) course ID.', duration: 4000})
                return
            }
            
            const result = this.AllTakenCourses.find( ({ ID }) => ID == this.searchInput.toUpperCase() )
            
            if (result === undefined){
                this.$notify.error({message: 'You have NOT taken that course yet!', title: 'Not Found!', duration: 4000})
            } 
            else {
                this.$notify.success({message: 'You have taken that course!', title: 'Found!', duration: 4000})
            }
        }
    },
})
</script>

<style>
.el-drawer__header {
    text-align: left;
    font-size: 1.5em;
}
.el-drawer__body {
    padding: 20px;
    position: relative;
    height: 85%;
    text-align: left;
}
.el-table .cell{
    word-break: break-word;
}
.drawer__footer{
    width:100%;
    height: 12%; 
    background: #fafafa;
    border-top: 1.5px solid #ebeef5;
    display:flex;
    justify-content: space-between;
    align-items: flex-end;
    bottom:0;
    left: 0;
    position: absolute;
    padding: 20px;      
    z-index: 100;      
}
</style>
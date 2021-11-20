<template>
    <!-- Delete button -->
    <el-tooltip class="item" effect="dark" content="Delete a taken course(s)" placement="top">
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteDrawerVisibility = true" style="margin-right:10px;"></el-button>
    </el-tooltip>

    <!-- Delete drawer -->
    <el-drawer title="Delete a taken course(s)" v-model="deleteDrawerVisibility" direction="rtl" size="50%" style="text-align:left;" ref="drawer">
        <!-- Drawer body -->
        <el-scrollbar ref="scrollbar" style="height: 88%;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="subcategoryListData.name" v-for="(subcategoryListData, key) in subcategoryList" :key= 'key'>
                    <el-table ref="multipleTable" :data="subcategoryListData.courses" @selection-change="handleSelectionChange(key,$event)" :default-sort = "{prop: 'ID', order: 'ascending'}">
                        <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
                        <el-table-column prop="ID" label="Course ID" width="130" sortable></el-table-column>
                        <el-table-column prop="Name" label="Name" sortable></el-table-column>
                        <el-table-column prop="Credit" label="Credit" width="100"></el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>
        <!-- Drawer footer -->
        <div class="drawer__footer">
            <div>
            <el-button @click="this.deleteDrawerVisibility = false">Cancel</el-button>
            <el-button type="danger" :disabled="check=disableButton()" :loading="deleteButtonLoading" @click="deleteCourses()">{{ deleteButtonLoading ? 'Deleting ...' : 'Delete' }}</el-button>
            </div>
        </div>
    </el-drawer>

</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
export default  defineComponent({
    props: {
        TakenCourses: Object,
        subcategories: Object
    },
    data() {
      return {
        deleteDrawerVisibility: false,
        deleteButtonLoading: false,
        changedTable: 0,
        selectedCourseAmount: 0,
        multipleSelection: [],
        nonTakenCourses: [],
        subcategoryList: [],
      };
    },
    created() {
        this.subcategoryList = this.subcategories.map(({ mainCategory, totalcredit, totalCreditAdvance, ...item }) => item)
        this.subcategoryList = this.subcategoryList.map(array => ({...array, courses: [], selected:[]}))
        for(let i = 0; i < this.subcategoryList.length; i++){
            this.groupingbySubCategory(this.TakenCourses, i)
        }
    },
    methods: {
        // link that help fix select all bug: https://stackoverflow.com/questions/51184290/how-to-get-selected-row-index-on-change-event-of-child-select-dropdown-in-eleme
        handleSelectionChange(key,val) {
            console.log("selection changed")
            this.changedTable = key
            this.subcategoryList[this.changedTable].selected = val
            for(let i = 0; i < this.subcategoryList.length; i++)
                console.log(this.subcategoryList[i].selected)
        },
        handleChange(val) {

        },
        disableButton() {
            let selectedCourseAmount = 0
            for(let i = 0; i < this.subcategoryList.length; i++){
                selectedCourseAmount = selectedCourseAmount + this.subcategoryList[i].selected.length
            }
            if(selectedCourseAmount == 0)
                return true
            else
                return false
        },
        groupingbySubCategory(TakenCourses, index) {
            if(this.subcategoryList[index].groupbyremark == false)
                this.subcategoryList[index].courses = TakenCourses.filter(course => course.Category == this.subcategoryList[index].name && course.remark == "none")
                
            else    
                this.subcategoryList[index].courses = TakenCourses.filter(course => course.remark == this.subcategoryList[index].name)
        },
        deleteCourses() {
            this.deleteButtonLoading = true
            for(let i = 0; i < this.subcategoryList.length; i++)
                this.multipleSelection = this.multipleSelection.concat(this.subcategoryList[i].selected)
            console.log("deleting")            
            console.log(this.multipleSelection)
            axios.post("https://scpm2021backend.herokuapp.com/taken-courses/deletetakencourse",  this.multipleSelection, {withCredentials: true})
            .then((res) => {
                if(res.data == 'Error'){
                    this.$message.error({message: 'Failed to delete course. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                    return
                }
                if(res.data == "delete success"){
                    alert("Course(s) deleted succesfully")
                    window.location.reload()
                }
                else{
                    alert("An error has occured.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
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
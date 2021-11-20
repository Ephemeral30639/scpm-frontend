<template>
    <!-- Add button -->
    <el-tooltip class="item" effect="dark" content="Add a non-taken course(s)" placement="top">
        <el-button type="primary" icon="el-icon-plus" circle @click="addDrawerVisibility = true" style="margin-right:10px;"></el-button>
    </el-tooltip>

    <!-- Add drawer -->
    <el-drawer title="Add a non-taken course(s)" v-model="addDrawerVisibility" direction="rtl" size="50%" style="text-align:left;" ref="drawer">
        <!-- Drawer body -->
        <el-scrollbar ref="scrollbar" style="height: 88%;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="subcategoryListData.name" v-for="(subcategoryListData, key) in subcategoryList" :key= 'key'>
                    <el-table ref="multipleTable" :data="subcategoryListData.courses" @selection-change="handleSelectionChange(key,$event)" :default-sort = "{prop: 'ID', order: 'ascending'}">
                        <el-table-column type="selection" width="55"> </el-table-column>
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
                <el-button @click="this.addDrawerVisibility = false">Cancel</el-button>
                <el-button type="primary" :disabled="check=disableButton()" :loading="addButtonLoading" @click="addCourses()">{{ addButtonLoading ? 'Adding ...' : 'Add' }}</el-button>
            </div>
            <div>
                <p class="sub-title" style="text-align: left; font-size: 12px; margin-bottom: 0px;">*Select type of your course(s)*</p>
                <el-select v-model="chosenRemark" >
                    <el-option v-for="remark in options" :key="remark.value" :label="remark.label" :value="remark.value"></el-option>
                </el-select> 
            </div>
        </div>
    </el-drawer>

</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
export default  defineComponent({
    props: {
        subcategories: Object
    },
    data() {
      return {
        addDrawerVisibility: false,
        addButtonLoading: false,
        chosenRemark: 'none',
        changedTable: 0,
        multipleSelection: [],
        nonTakenCourses: [],
        subcategoryList: [],
        specialsubcategory: [],
        options: [
            {
                value: 'none',
                label: 'Normal'
            }
        ],
      };
    },
    created() {
        axios.get('https://scpm2021backend.herokuapp.com/taken-courses/loadnontakencourse', {withCredentials: true})
        .then((res) => {
        
            if(res.data == 'Error'){
            this.$message.error({message: 'Failed to load non taken courses. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
            return
            }

            this.nonTakenCourses = res.data

            // Grouping non-taken courses into subcategory
            this.subcategoryList = this.subcategories.filter(Subcategory => Subcategory.groupbyremark == false)
            this.subcategoryList = this.subcategoryList.map(({ mainCategory, totalcredit, totalCreditAdvance, groupbyremark, ...item }) => item)
            this.subcategoryList = this.subcategoryList.map(array => ({...array, courses: [], selected:[]}))
            for(let i = 0; i < this.subcategoryList.length; i++){
                this.groupingbySubCategory(res.data, i)
            }
            //remark options
            this.specialsubcategory = this.subcategories.filter(Subcategory => Subcategory.groupbyremark == true).map(({name}) => ({name}))
            for(let i = 0; i < this.specialsubcategory.length; i++){
                this.options = this.options.concat({value: this.specialsubcategory[i].name, label: this.specialsubcategory[i].name})
            }
            console.log(this.options)

            this.loading = false
        })
        .catch((err) => {
            console.log(err)
        })
    },
    methods: {
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
        groupingbySubCategory(nonTakenCourses, index) {
            this.subcategoryList[index].courses = nonTakenCourses.filter(course => course.Category == this.subcategoryList[index].name)
        },
        addCourses() {
            this.addButtonLoading = true
            for(let i = 0; i < this.subcategoryList.length; i++){
                this.multipleSelection = this.multipleSelection.concat(this.subcategoryList[i].selected)
            }
            this.multipleSelection = this.multipleSelection.map(array => ({...array, remark: this.chosenRemark}))
            console.log("adding")            
            console.log(this.multipleSelection)
            axios.post("https://scpm2021backend.herokuapp.com/taken-courses/addtakencourse",  this.multipleSelection, {withCredentials: true})
            .then((res) => {
                if(res.data == 'Error'){
                    this.$message.error({message: 'Failed to add course. Please wait a moment and refresh the page to try again.', duration: 10000, showClose: true})
                    return
                }
                if(res.data == "add success"){
                    alert("Course(s) added succesfully")
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
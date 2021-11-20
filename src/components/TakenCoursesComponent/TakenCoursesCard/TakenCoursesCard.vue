<template>
    <el-col :span="auto" style="margin-top:24px;">
        <div class="grid-content bg-purple"></div>
        <el-card :body-style="{ padding: '0px' }">
            <div class="el-card__header category_header">
                <div class="row" style="height:4em; margin-top:8px; margin-bottom:8px; overflow:hidden;"><h3>{{subCategoryData.name}}</h3></div>
                
                <!-- dashboard progress bar (category with advanced track) -->
                <div v-if = "subCategoryData.totalCreditAdvance != 0">
                    <TakenCoursesProgressBarAdvance :obtainedCredit="subCategoryData.obtainedCredit" :totalCredit="subCategoryData.totalCredit" :totalCreditAdvance="subCategoryData.totalCreditAdvance" :colors="colors"></TakenCoursesProgressBarAdvance>
                </div>

                <!-- dashboard progress bar (non-credit category) -->
                <div v-else-if= "subCategoryData.totalCredit == 0">
                    <TakenCoursesProgressBarNonCredit></TakenCoursesProgressBarNonCredit>
                </div>
                
                <!-- dashboard progress bar (normal) -->
                <div v-else>
                    <TakenCoursesProgressBar :obtainedCredit="subCategoryData.obtainedCredit" :totalCredit="subCategoryData.totalCredit" :colors="colors"></TakenCoursesProgressBar>
                </div>
                
            </div>
            <el-scrollbar height="200px">
                <h1 v-show="checkEmpty()" style="margin-top: 80px; color: red;">No Course</h1>
                <div v-for="o in subCategoryData.taken.length" :key="o" style="padding-top: 10px;">
                    <el-container style="padding-left: 10px;">
                        <p>{{subCategoryData.taken[parseInt(o-1)].ID}}</p>
                        <el-divider direction="vertical"></el-divider>
                        <p style="text-align: left; padding-right: 10px">{{subCategoryData.taken[parseInt(o-1)].Name}} <strong>({{subCategoryData.taken[parseInt(o-1)].Credit}})</strong></p>
                    </el-container>
                </div>
            </el-scrollbar>
        </el-card>
    </el-col>
</template>

<script>
import TakenCoursesProgressBar from '../TakenCoursesCard/TakenCoursesProgressBar.vue'
import TakenCoursesProgressBarNonCredit from '../TakenCoursesCard/TakenCoursesProgressBarNonCredit.vue'
import TakenCoursesProgressBarAdvance from '../TakenCoursesCard/TakenCoursesProgressBarAdvance.vue'

export default {
    props: {
        subCategoryData: Object
    },
    components: {
        TakenCoursesProgressBar,
        TakenCoursesProgressBarNonCredit,
        TakenCoursesProgressBarAdvance
    },
    data () {
        return {
            colors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#6f7ad3', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#69faff', percentage: 99 },
                { color: '#69ff7d', percentage: 100}
            ],
        }
    },
    methods: {
        checkEmpty(){
            if(this.subCategoryData.taken.length == 0){
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
.category_header{
    height: 260px;
}
</style>
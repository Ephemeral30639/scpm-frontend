<template>
    <el-col :span="span">
        <div class="grid-content bg-purple"></div>
        <el-card :body-style="{ padding: '0px' }">
            <template #header>
                <h3>{{title}}</h3>
                <el-container style="display: flex; justify-content: center;">
                    <el-space>
                        <div>
                            <el-progress type="dashboard" :percentage="calculate(obtainedCredit, totalCreditAdvance)" :color="colors">
                                <el-container direction="vertical">
                                    <span class="percentage-value" style="font-weight: bolder;">{{obtainedCredit}} / {{totalCreditAdvance}}</span>
                                    <br>
                                    <span style="font-weight: bolder;">Credits</span>
                                </el-container>
                            </el-progress>
                            <p><em>Advance Track</em></p>
                        </div>
                        <div>
                            <el-progress type="dashboard" :percentage="calculate(obtainedCredit, totalCreditNormal)" :color="colors">
                                <el-container direction="vertical">
                                    <span class="percentage-value" style="font-weight: bolder;">{{obtainedCredit}} / {{totalCreditNormal}}</span>
                                    <br>
                                    <span style="font-weight: bolder;">Credits</span>
                                </el-container>
                            </el-progress>
                            <p><em>Normal Track</em></p>
                        </div>
                    </el-space>
                </el-container>
            </template>
            <el-scrollbar height="200px">
                <h1 v-show="checkEmpty()" style="margin-top: 80px; color: red;">No Course</h1>
                <div v-for="o in courses.length" :key="o" style="padding-top: 10px;">
                    <el-container style="padding-left: 10px;">
                        <p>{{courses[parseInt(o-1)].ID}}</p>
                        <el-divider direction="vertical"></el-divider>
                        <p style="text-align: left; padding-right: 10px">{{courses[parseInt(o-1)].Name}} <strong>({{courses[parseInt(o-1)].Credit}})</strong></p>
                    </el-container>
                </div>
            </el-scrollbar>
        </el-card>
    </el-col>
</template>

<script>
export default {
    props: {
        title: String,
        courses: Object,
        obtainedCredit: Number,
        totalCreditAdvance: Number,
        totalCreditNormal: Number,
        span: Number,
        colors: Object
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
            ]
        }
    },
    methods: {
        calculate (obtainedCredit, totalCredit){
            let result = (obtainedCredit/totalCredit)
            if(result > 1){
                console.log('1')
                return 100
            } else {
                return ((obtainedCredit/totalCredit)*100)
            }
        },
        checkEmpty(){
            if(this.courses.length == 0){
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style>

</style>
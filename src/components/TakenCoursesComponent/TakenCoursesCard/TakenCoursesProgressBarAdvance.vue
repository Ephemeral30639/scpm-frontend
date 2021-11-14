<template>
    <!-- dashboard progress bar (category with advanced track) -->
    <el-container style="display: flex; justify-content: space-evenly;">
        
                <el-progress type="dashboard" :percentage="calculate(obtainedCredit, totalCreditAdvance)" :color="colors">
                    <el-container direction="vertical">
                        <span class="percentage-value" style="font-weight: bolder;">{{obtainedCredit}} / {{totalCreditAdvance}}</span>
                        <br>
                        <span style="font-weight: bolder; font-size:0.8em;">Advance Track Credits</span>
                    </el-container>
                </el-progress>
                
                <el-progress type="dashboard" :percentage="calculate(obtainedCredit, totalCredit)" :color="colors">
                    <el-container direction="vertical">
                        <span class="percentage-value" style="font-weight: bolder;">{{obtainedCredit}} / {{totalCredit}}</span>
                        <br>
                        <span style="font-weight: bolder; font-size:0.8em;"> Normal Track Credits</span>
                    </el-container>
                </el-progress>
        
    </el-container>
</template>

<script>
export default {
    props: {
        obtainedCredit: Number,
        totalCredit: Number,
        totalCreditAdvance: Number,
        colors: Object
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
    }
}
</script>

<style>

</style>
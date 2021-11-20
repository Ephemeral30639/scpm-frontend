<template>
    <el-progress type="dashboard" :percentage="(obtainedCredit/totalCredit)*100" :color="colors">
        <el-container direction="vertical">
            <span class="percentage-value" style="font-weight: bolder;">{{obtainedCredit}} / {{totalCredit}}</span>
            <br>
            <span style="font-weight: bolder;">Credits</span>
        </el-container>
    </el-progress>
</template>

<script>
export default {
    props: {
        obtainedCredit: Number,
        totalCredit: Number,
        colors: Object
    },
}
</script>

<style>

</style>
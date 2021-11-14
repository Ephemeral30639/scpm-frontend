<template>
    <!-- dashboard progress bar (non-credit category) -->
    <el-progress type="dashboard" :percentage="0" :color="colors" status="exception">
        <el-container direction="vertical">
            <span class="percentage-value" style="font-weight: bolder;">0 / 0</span>
            <br>
            <span style="font-weight: bolder;">Non-Credit</span>
        </el-container>
    </el-progress>
</template>

<script>
export default {

}
</script>

<style>

</style>
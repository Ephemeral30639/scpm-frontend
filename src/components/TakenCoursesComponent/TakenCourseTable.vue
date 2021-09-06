<template>
    <!-- collapse item -->
    <el-collapse-item :title="title" :name="name">
        <!-- table -->
        <el-table :data="courses" stripe style="width: 100%; justify-content: space-between;"> 
            <el-table-column prop="ID" label="Course ID" ></el-table-column>
            <el-table-column prop="Name" label="Name" ></el-table-column>
            <el-table-column prop="Credit" label="Credit"></el-table-column>
        </el-table>
        <el-tag :type="success" style="margin-top:25px;">Total Credit Earned: {{totalCredit}}</el-tag>
    </el-collapse-item>
</template>

<script>
export default {
    props: {
        title: String,
        name: String,
        courses: Object,
        totalCredit: Number
    },
}
</script>

<style>

</style>
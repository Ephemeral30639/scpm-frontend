<template>
<h1>Course Advice Editor</h1>
<el-row>

    <el-col :span="12">
        <h2>Add New Advice</h2>
        <div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="Category" prop="category">
                    <el-input v-model="form.category"></el-input>
                </el-form-item>
                <el-form-item label="Course ID" prop="courseID">
                    <el-input v-model="form.courseID"></el-input>
                </el-form-item>
                <el-form-item label="Advice Text" prop="adviceText">
                    <el-input type="textarea" v-model="form.adviceText" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="resetForm('form')">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-col>

    <el-col :span="12">
        <h2>Edit Advice</h2>
        <div>
            <el-form ref="editForm" :model="editForm" label-width="120px">
                <el-form-item label="Category" prop="category">
                    <el-input v-model="editForm.category"></el-input>
                </el-form-item>
                <el-form-item label="Course ID" prop="courseID">
                    <el-input v-model="editForm.courseID"></el-input>
                </el-form-item>
                <el-form-item label="Advice Text" prop="adviceText">
                    <el-input type="textarea" v-model="editForm.adviceText" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Confirm</el-button>
                    <el-button @click="resetForm('editForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-col>

</el-row>

</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {        
        form: {
          category: '',
          courseID: '',
          adviceText: ''
        },
        editForm: {
          category: '',
          courseID: '',
          adviceText: ''
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      onSubmit() {
        console.log(this.form)
      },
      resetForm(formName){
          this.$refs[formName].resetFields()
      }
    },
    mounted(){

    }
  }
</script>

<style>

</style>
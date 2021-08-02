<template>

<!-- Top Navigation Bar -->
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><a href="/">Home</a></el-menu-item>
  <el-submenu index="2">
    <template #title>Features</template>
    <el-menu-item index="2-1">Course and Credit Tracking</el-menu-item>
    <el-menu-item index="2-2">Course Suggestions</el-menu-item>
    <el-menu-item index="2-3">Generation Per Course Counter</el-menu-item>
    <el-menu-item index="2-4">Makeup Finder</el-menu-item>
  </el-submenu>
  <el-menu-item index="3"><a href="/login">Login</a></el-menu-item>
  <el-menu-item index="4"><a href="/register">Register</a></el-menu-item>
</el-menu>

<!-- Form -->
<div style="padding-top: 50px; padding-left: 300px; padding-right: 300px;">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="ruleForm.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="ruleForm.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input type="email" v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  export default {
    data() {
      
      // Form Validation Functions
      var checkFirstName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input your first name'));
        } else {
          callback()
        }
      };
      var checkLastName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input your last name'));
        } else {
          callback()
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input your email'));
        }
        if (!value.includes("student.mahidol.edu")){
          return callback(new Error("Please use an EDU email"))
        }
        callback()

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        
        // Top Navigation Bar Yellow Highlighting
        activeIndex: '4',
        
        // Form Data Variables
        ruleForm: {
          firstName: '',
          lastName: '',
          email: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          firstName: [
            { validator: checkFirstName, trigger: 'blur'}
          ],
          lastName: [
            { validator: checkLastName, trigger: 'blur'}
          ],
          email: [
            { validator: checkEmail, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
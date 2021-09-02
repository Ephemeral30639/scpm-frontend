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
<el-row>

  <el-col :span="12">
    <div style="padding-top: 50px;">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-col>

  <el-col :span="12">
    <div style="padding-top: 50px;">
      <img src="../assets/registration-logo.jpg" alt="Girl in a jacket">
    </div>
  </el-col>

</el-row>

</template>

<script>
import axios from 'axios';
export default {
    data() {
      
      // Form Validation Functions
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
      return {
        
        // Top Navigation Bar Yellow Highlighting
        activeIndex: '3',
        
        // Form Data Variables
        ruleForm: {
          email: '',
          pass: ''
        },
        rules: {
          email: [
            { validator: checkEmail, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
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
            //Gather Log In Data
            var loginData = {
              "email": this.ruleForm.email,
              "password": this.ruleForm.pass
              }
            
            //Post to backend for authentication. If Successful, return to homepage.
            axios.post('http://localhost:5000/login', loginData, { withCredentials: true })
              .then(reponse => {
                if(reponse.data == "Successful Log In"){
                  alert('Logged In');
                  this.$router.push({path:'/'})
                }
              })
              .catch(error => {
                alert("Log in failed. Check your credentials.")
              })
          } else {
              alert("Log in failed. Please check the errors.")
              return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted(){
      axios.get('http://localhost:5000/login', { withCredentials: true })
          .then(reponse => {
            if (reponse.data == 'Already Logged In'){
              alert('you are already logged in.')
              this.$router.push({path:'/'})
            }
          })
    }
  }
</script>

<style>

</style>
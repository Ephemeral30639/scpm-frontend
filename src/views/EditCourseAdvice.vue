<template>
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
            // " { withCredentials: true } " is a piece of code that tells CORS to accept incoming cookies. 
            //We need to accept cookies because that's what identify the "session" that the user is logged into.
            axios.post('http://localhost:5000/login', loginData, { withCredentials: true })
              .then(reponse => {
                if(reponse.data == "Successful Log In"){
                  if(loginData.email == 'admin@student.mahidol.edu'){
                    alert('Administrator logged in');
                    this.$root.adminChange('adminToolShow On')
                    this.$router.push({path:'/'})
                  } else {
                    alert('Logged In');
                    this.$router.push({path:'/'})
                  }
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

    }
  }
</script>

<style>

</style>
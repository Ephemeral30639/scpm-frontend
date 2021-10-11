<template>
<!-- Form -->
<el-row v-loading="loading">

  <el-col :span="12">
    <div style="padding-top: 50px;">
      <h1 style="padding-bottom: 30px;">Login</h1>
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
      <img src="../assets/login-logo.jpg" alt="Girl in a jacket">
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
        },
        loading: true
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
            
            this.loading = true
            //Post to backend for authentication. If Successful, return to homepage.
            // " { withCredentials: true } " is a piece of code that tells CORS to accept incoming cookies. 
            //We need to accept cookies because that's what identify the "session" that the user is logged into.
            axios.post('https://localhost:5000/login', loginData, { withCredentials: true })
              .then(reponse => {
                if(reponse.data == "Successful Log In"){
                  if(loginData.email == 'admin@student.mahidol.edu'){
                    this.$message.success({message: 'Welcome, Administrator', duration: 4000})
                    this.$root.adminChange('adminToolShow On')
                    this.$router.push({path:'/'})
                  } else {
                    this.$message.success({message: 'Successfully Logged In', duration: 4000})
                    this.$router.push({path:'/'})
                  }
                }
              })
              .catch(error => {
                this.$message.error({message: 'Log in failed. Check your credentials.', duration: 4000})
                this.loading = false
              })
          } else {
              return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted(){
      // Sending a GET request to login. This is use to check if the user is already logged. If they are already logged in, redict to homepage.
      // Cookies need to be send as well. If backend can identify the cookie, means that the user already logged in.
      axios.get('https://localhost:5000/login', { withCredentials: true })
          .then(reponse => {
            if (reponse.data == 'Already Logged In'){
              this.$message.warning({message: 'You are already logged in.', duration: 4000})
              this.$router.push({path:'/'})
            }
            else {
              this.loading = false
            }
          })
    }
  }
</script>

<style>

</style>
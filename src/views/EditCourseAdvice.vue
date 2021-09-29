<template>
<div v-loading="loading">
    <h1>Course Advice Editor</h1>
    <el-switch
    style="display: block"
    v-model="switchState"
    active-color="#808080"
    inactive-color="#808080"
    active-text="Edit"
    inactive-text="Create"
    @change="switchChanged"
    >
    </el-switch>
    <el-row>

        <el-col :span="12">
            <h2>Add New Advice</h2>
            <div style="padding-top: 60px;">
                <el-form ref="form" :model="form" label-width="120px" :disabled="createFormDisabled">
                    <el-form-item label="Category" prop="category">
                        <el-container>
                            <el-select v-model="select" placeholder="Select" style="width: 350px">
                                <div v-for="o in categoryLabels.length" :key="o">
                                    <el-option :label="categoryLabels[parseInt(o-1)]" :value="categoryLabels[parseInt(o-1)]"></el-option>
                                </div>
                            </el-select>
                            <el-input v-model="form.category" :disabled="categoryInputDisabled"></el-input>
                        </el-container>
                    </el-form-item>
                    <el-form-item label="Course ID" prop="courseID" :rules="[{required: true, message: 'Cannot be empty.'}]">
                        <el-input v-model="form.courseID"></el-input>
                    </el-form-item>
                    <el-form-item label="Advice Text" prop="adviceText" :rules="[{required: true, message: 'Cannot be empty.'}]">
                        <el-input type="textarea" v-model="form.adviceText" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">Create</el-button>
                        <el-button @click="resetForm('form')">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>

        <el-col :span="12">
            <h2>Edit Advice</h2>
            <div>
                <div style="padding-bottom: 20px;">
                    <el-autocomplete
                        class="inline-input"
                        v-model="state2"
                        :fetch-suggestions="querySearch"
                        placeholder="Select Course"
                        :trigger-on-focus="true"
                        @select="handleSelect"
                        :clearable="true"
                        :disabled="editCourseInputDisabled"
                    ></el-autocomplete>
                </div>
                <el-form ref="editForm" :model="editForm" label-width="120px" :disabled="editFormDisabled">
                    <el-form-item label="Category" prop="category" :rules="[{required: true, message: 'Cannot be empty.'}]">
                        <el-input v-model="editForm.category"></el-input>
                    </el-form-item>
                    <el-form-item label="Course ID" prop="courseID" :rules="[{required: true, message: 'Cannot be empty.'}]">
                        <el-input v-model="editForm.courseID" disabled=true></el-input>
                    </el-form-item>
                    <el-form-item label="Advice Text" prop="adviceText" :rules="[{required: true, message: 'Cannot be empty.'}]">
                        <el-input type="textarea" v-model="editForm.adviceText" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onConfirm('editForm')">Confirm</el-button>
                        <el-button @click="resetForm('editForm')">Reset</el-button>
                        <el-button type="danger" @click="onDelete">Delete</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>

    </el-row>
</div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
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
        },
        editFormDisabled: true,
        createFormDisabled: false,
        switchState: false,
        editCourseInputDisabled: true,
        loading: false,
        select: ref('New Category'),
        categoryLabels: ['New Category'],
        categoryInputDisabled: false
      }
    },
    setup() {
    const restaurants = ref([]);
    const querySearch = (queryString, cb) => {
      var results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value;
        // call callback function to return suggestions
        cb(results);
    };
    const createFilter = (queryString) => {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    };
    const loadAll = () => {
      // This function is called immediately when user loads the page.
      // This is probably where you connect backend to ask for active courses in the active trimeester.
      axios.get('http://localhost:5000/advice/getalladvice')
      .then((response) => {
        var data = []
        for (var i = 0; i < response.data.length; i++){
          data.push({value: response.data[i].courseID})
        }
        restaurants.value = data
        return
      })
    };
    onMounted(() => {
      loadAll();
    });
    return {
      restaurants,
      state1: ref(''),
      state2: ref(''),
      querySearch,
      createFilter,
      loadAll
    };
  },
  methods: {
      handleSelect(item) {
        axios.get('http://localhost:5000/advice/getspecificadvice', {params:{course: item.value}})
        .then(response =>{
            this.editForm.category = response.data[0].category
            this.editForm.courseID = response.data[0].courseID
            this.editForm.adviceText = response.data[0].adviceText
            this.editFormDisabled = false
        })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.form.category == '' && this.select == 'New Category'){
                    this.$message.error({message: 'Category is empty!', duration: 4000})
                    return
                } else {
                    this.loading = true
                    axios.post('http://localhost:5000/advice/createadvice', null, {params: this.form})
                    .then(response => {
                        if(response.data == 'Successfully Created'){
                            this.$message.success({message: 'Advice Successfully Created', duration: 4000})
                            this.resetForm('form')
                            this.loading = false
                        }
                    })
                }
            } else {
                console.log('error submit!!')
                return false
            }
        })
      },
      onConfirm(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.loading = true
                axios.post('http://localhost:5000/advice/editadvice', null, {params: this.editForm})
                .then(response => {
                    if(response.data == 'Successfully Edit'){
                        this.$message.success({message: 'Successfully Edited', duration: 4000})
                        this.editFormDisabled = true
                        this.resetForm('editForm')
                        this.loading = false
                    }
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })
      },
      onDelete(){
        this.loading = true
        axios.delete('http://localhost:5000/advice/deleteadvice', {params: this.editForm})
        .then(response => {
            if(response.data == 'Successfully Delete'){
                this.$message.success({message: 'Successfully Deleted', duration: 4000})
                this.editFormDisabled = true
                this.resetForm('editForm')
                this.loading = false
            }
        })
      },
      resetForm(formName){
          this.$refs[formName].resetFields()
          if(formName == 'editForm'){
              this.editFormDisabled = true
          }
      },
      switchChanged(){
          if(this.switchState == true){
              this.editCourseInputDisabled = false
              this.createFormDisabled = true
          } else {
              this.editCourseInputDisabled = true
              this.editFormDisabled = true
              this.resetForm('editForm')
              this.createFormDisabled = false
          }
      }
    },
    mounted(){
        this.loading = true
        axios.get('http://localhost:5000/getuser', {withCredentials: true})
        .then(response => {
            if (response.data == "Not Logged In") {
              this.$message.error({message: 'You are not logged in. Please log in first.', duration: 4000})
              this.$router.push({path: '/login'})
            } else if (response.data.user.firstname != 'admin'){
                this.$message.error({message: 'You are not the administrator.', duration: 4000})
                this.$router.push({path: '/'})
            } else if (response.data.user.firstname == 'admin'){
                this.loading = false

                axios.get('http://localhost:5000/advice/getalladvicecategory')
                .then(response => {
                    for(var i = 0; i < response.data.length; i++){
                        this.categoryLabels.push(response.data[i].category)
                    }
                })
            }
        })
    },
    watch: {
        select(val){
            if (val != 'New Category'){
                this.categoryInputDisabled = true
                this.form.category = val
            } else {
                this.categoryInputDisabled = false
                this.form.category = ''
            }
        }
    }
});
</script>

<style>

</style>
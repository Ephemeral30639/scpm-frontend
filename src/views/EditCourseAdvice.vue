<template>
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
                <el-form-item label="Category" prop="category" :rules="[{required: true, message: 'Cannot be empty.'}]">
                    <el-input v-model="form.category"></el-input>
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
        editCourseInputDisabled: true
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
                axios.post('http://localhost:5000/advice/createadvice', null, {params: this.form})
                .then(response => {
                    if(response.data == 'Successfully Created'){
                        alert('Created Successful')
                        this.resetForm('form')
                    }
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })
      },
      onConfirm(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                axios.post('http://localhost:5000/advice/editadvice', null, {params: this.editForm})
                .then(response => {
                    if(response.data == 'Successfully Edit'){
                        alert('Edit Successful')
                        this.editFormDisabled = true
                        this.resetForm('editForm')
                    }
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })
      },
      onDelete(){
        axios.delete('http://localhost:5000/advice/deleteadvice', {params: this.editForm})
        .then(response => {
            if(response.data == 'Successfully Delete'){
                alert('Delete Successful')
                this.editFormDisabled = true
                this.resetForm('editForm')
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

    }
});
</script>

<style>

</style>
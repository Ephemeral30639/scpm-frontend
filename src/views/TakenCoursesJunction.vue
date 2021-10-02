<template>
    <div v-loading="true">
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted () {
        axios.get('http://localhost:5000/getuser', {withCredentials: true})
        .then(res => {
            if (res.data == "Not Logged In") {
                this.$message.error({message: 'You are not logged in. Please log in first.', duration: 4000})
                this.$router.push({path: '/login'})
            } else {
                this.$message.warning({message: `Redirecting you to Generation ${res.data.user.studentID.substring(0,2)}.`, duration: 6000})
                this.$router.push({path: `/takencourses${res.data.user.studentID.substring(0,2)}`})      
            }
        })
    }
}
</script>
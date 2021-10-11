<template>
    <div v-loading="true">
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted () {
        axios.delete('https://scpm2021backend.herokuapp.com/logout', {withCredentials: true})
        .then(response => {
          if (response.data == 'Log out successful'){
              this.$message.success({message: 'Successfully Logged Out', duration: 4000})
              this.$root.adminChange('adminToolShow Off')
              this.$router.push({path:'/'})
          }
          else {
              this.$message.warning({message: 'Not logged in. Nothing to log out of.', duration: 4000})
              this.$router.push({path:'/'}) 
          }
        })
    }
}
</script>
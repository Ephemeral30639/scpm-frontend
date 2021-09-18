<template>
    
</template>

<script>
import axios from 'axios'
export default {
    mounted () {
        axios.delete('http://localhost:5000/logout', {withCredentials: true})
        .then(response => {
          if (response.data == 'Log out successful'){
              alert('Log out Successful.')
              this.$root.adminChange('adminToolShow Off')
              this.$router.push({path:'/'})
          }
          else {
              alert('You are not logged in. Nothing to log out.')
              this.$router.push({path:'/'}) 
          }
        })
    }
}
</script>
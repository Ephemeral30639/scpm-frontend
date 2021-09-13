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
              this.$router.push({path:'/'})
          }
          else {
              alert('You are not logged in.')
              this.$router.push({path:'/'})
          }
        })
    }
}
</script>
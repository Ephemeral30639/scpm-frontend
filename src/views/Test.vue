<template>
<!-- This vue component is used for debugging and testing stuff -->
    <div>    
        <h2>Dashboard</h2>    
        <p>Name: {{ user.name }}</p>    
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    
    export default {    
        name: "Login",    
        data() {    
            return {    
                user: {    
                    name: "Jesse"   
                }    
            }    
        },    
        methods: {    
            getUserData: function() {    
                let self = this    
                axios.get("http://localhost:5000/getuser", { withCredentials: true })    
                    .then((response) => {    
                        console.log(response)    
                        this.user.name = response.data.user.firstname    
                    })    
                    .catch((errors) => {    
                        console.log(errors)    
                        router.push("/")    
                    })    
            }    
        },    
        mounted() {    
            this.getUserData()    
        }    
    }
</script>
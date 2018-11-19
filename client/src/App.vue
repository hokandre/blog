<template>
  <div>
     <mynavbar :jtoken = "jtoken" @logout="logout" @login="login"></mynavbar>
     <router-view :jtoken="jtoken" :user_id="user_id"></router-view>
  </div>
</template>

<script>
import mynavbar from '@/components/navbar.vue'
export default {
  components : { mynavbar },
  data () {
    return {
      jtoken : localStorage.getItem('token') ? localStorage.getItem('token') : false,
      user_id : localStorage.getItem('user_id') ? localStorage.getItem('user_id') : false
    }   
  },
    methods : {
        isLogin : function(){
            this.jtoken = localStorage.getItem('token') ? localStorage.getItem('token') : false
        },
        logout : function(e){
          this.jtoken = false
          this.$router.push('/')
        },
        login: function(value){
          this.jtoken = value.token
          this.user_id = value.user_id
        }
    },
    created(){
        this.isLogin()
    }
};
</script>

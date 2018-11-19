<template>
     <div class="container mt-5">
         <formarticle :jtoken="jtoken" @add_article="read"></formarticle>
         <div class="row">
             <div class="col-md-4">
                <div class="d-flex flex-column row mb-2 mt-3">
            
                    <articlecart v-for="(article, index) in articles" :key="index" :user_id="user_id" :article="article" @update_article="read" :jtoken="jtoken" @delete_article="read" @add_comment="read" @update_comment="read"></articlecart>
                </div>
             </div>
             <div class="col-md-8">
                <router-view :jtoken="jtoken"></router-view>
             </div>
         </div>
       
    </div>
</template>

<script>
import formarticle from '@/components/form-add-articles.vue'
import articlecart from '@/components/article-card.vue'

export default {
    props: ['jtoken','user_id'],
    components : { formarticle, articlecart },
    data(){
        return{
            articles :[]
        }
    },
    methods : {
        read : function(){
            axios({
                method : 'GET',
                url : 'http://localhost:3000/articles',
            })
            .then(  ({data}) =>{
                console.log( data )
                this.articles = data
            })
            .catch( error =>{
                console.log( error)
            })
        },
    },
   created() {
       if ( !this.jtoken ){
           this.$router.push('/')
       }else{
           this.read()
       }
   },
}
</script>

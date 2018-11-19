<template>
    <div class="container">

        <div class="form-inline">
          <input v-model="form_add_comment.isi" type="email" class="form-control" id="comment" placeholder="comment...">
          <button class="btn btn-primary" @click="add_comment">POST</button>
        </div>
    </div>
</template>

<script>
export default {
    props : ['jtoken','id_article'],
    data(){
        return{
            form_add_comment:{
                isi : '',
            }
        }
    },
    methods :{
         clear : function(){
            this.form_add_comment.isi = ''
        },
        add_comment : function(){
          axios({
              method : 'PUT',
              url : `http://localhost:3000/articles/add-comment/${this.id_article}`,
              headers : { jtoken : this.jtoken},
              data: {
                  isi: this.form_add_comment.isi
              }
          })
          .then(  ( { data } ) =>{
              this.clear()
              this.$emit('add_comment')
          })
          .catch( ({ response }) => {
              let message = response.data.message
              console.log(message)
          })
        }
    }
    
}
</script>

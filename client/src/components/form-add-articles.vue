<template>
    <div class="container">

        <div class="form-group">
          <p class="{ 'alert alert-success' : form_add_article.succes, 'alert alert-danger': form_add_article.error}">{{ form_add_article.succes ? form_add_article.succes : form_add_article.error}}</p>
          <label for="title">Title : </label>
          <input v-model="form_add_article.title" type="email" class="form-control" id="title" placeholder="title...">
          <small class="text text-danger" v-if="form_add_article.error_title">{{ form_add_article.error_title }}</small>
        </div>

        <div class="form-group">
          <label for="description">Descriptions :</label>
          <textarea v-model="form_add_article.description" class="form-control" id="description" rows="3"></textarea>
          <small class="text text-danger" v-if="form_add_article.error_description">{{ form_add_article.error_description }}</small>

        </div>

        <button class="btn btn-primary" @click="add_article">POST</button>
         <button class="btn btn-primary ml-3" @click="clear">CLEAR</button>

    </div>
</template>

<script>
export default {
    props : ['jtoken'],
    data(){
        return{
            form_add_article:{
                succes : false,
                error : '',
                title : '',
                description :''
            }
        }
    },
    methods :{
         clear : function(){
            this.form_add_article.title = ''
            this.form_add_article.description = ''
            this.form_add_article.error_title=''
            this.form_add_article.error_description=''
        },
        add_article : function(){
          axios({
              method : 'POST',
              url : 'http://localhost:3000/articles',
              headers : { jtoken : this.jtoken},
              data: {
                  title: this.form_add_article.title, description : this.form_add_article.description
              }
          })
          .then(  ( { data } ) =>{
              this.clear()
              this.form_add_article.succes = data.message
              this.$emit('add_article')
              console.log(data.message)
          })
          .catch( ({ response }) => {
              let message = response.data.message
              this.form_add_article.error = message
          })
        }
    }
    
}
</script>

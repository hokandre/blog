<template>
    <div> 
        <div class="card mb-4 shadow-sm h-md-250">
            <div class="card-header">
                <div class="row">
                    <div class="col-3 my-auto">
                        <img class="rounded-circle" src="https://cdn3.iconfinder.com/data/icons/business-and-finance-icons/512/Business_Man-512.png" alt="gagal load" width="50px">
                    </div>
                    <div class="col-6 my-auto">
                        <h3 class="my-auto"> {{ article.author.name }} </h3>
                    </div>
                    <div v-if="user_id === article.author._id" class="col-3 my-auto">
                        <div class="dropdown">
                            <a data-toggle="dropdown">
                                <img src="../assets/opition-icon.png" width="30px">
                            </a>
                                <div class="dropdown-menu sm-3">
                                   <a class="dropdown-item btn btn-primary" type="button" data-toggle="modal" data-target="#updateArticle"> 
                                        Update
                                    </a>
                                    <a class="dropdown-item btn btn-primary" type="button" data-toggle="modal" data-target="#deleteArticle"> 
                                        Delete
                                    </a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body d-flex flex-column align-items-start text-wrap">
                <router-link :to="'/articles/'+article._id">
                    <h3 class="mb-0">
                        <a class="text-dark text-capitalize" href="#">{{ article.title }}</a>
                    </h3>
                </router-link>
                <div class="mb-1 text-muted">{{ formatDate(article.createdAt)}}</div>
                <p class="card-text mb-auto">{{ article.description.substring(0,100) }}</p>
                 <router-link :to="'/articles/'+article._id">
                        <a href="#">Continue reading</a>
                  </router-link>
                <hr>
                <small class="font-weight-bold mt-1"> Comment : </small>
            </div>

            <mycommentlist :comments="article.comments" @update_comment="update_comment" :jtoken="jtoken" :user_id="user_id"></mycommentlist>
            <formaddcomment :jtoken="jtoken" :id_article="article._id" @add_comment="add_comment"></formaddcomment>
            
        </div>
        <div class="modal fade" id="updateArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Article</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                   <div class="container">
                        <div class="form-group">
                        <p class="{ 'alert alert-success' : form_update_article.succes, 'alert alert-danger': form_update_article.error}">{{ form_update_article.succes ? form_update_article.succes : form_update_article.error}}</p>
                        <label for="title">Title : </label>
                        <input v-model="form_update_article.title" type="email" class="form-control" id="title" placeholder="title...">
                        <small class="text text-danger" v-if="form_update_article.error_title">{{ form_update_article.error_title }}</small>
                        </div>

                        <div class="form-group">
                        <label for="description">Descriptions :</label>
                        <textarea v-model="form_update_article.description" class="form-control" id="description" rows="3"></textarea>
                        <small class="text text-danger" v-if="form_update_article.error_description">{{ form_update_article.error_description }}</small>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="update_article(article._id)">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Article</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                   <div class="container">
                       <p class="alert alert-warning">
                           Anda Yakin Ingin Mnghapus Article ini?
                       </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" @click="delete_article(article._id)">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mycommentlist from '@/components/comment-list.vue'
import formaddcomment from '@/components/form-add-comment.vue'
export default {
    props:['article','jtoken','user_id'],
    components : { mycommentlist, formaddcomment },
    data(){
        return {
             form_update_article:{
                succes : false,
                error : '',
                title : this.article.title,
                description :this.article.description
            }
        }
    },
    methods : {
        formatDate : function(dateFormat) {
            
            let date = new Date( dateFormat)

            const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"];
            let month = monthNames[date.getMonth()]
            let day = date.getDay()
            let year  = date.getFullYear()
            return ` ${ month } ${day} ${ year}`

        },
        clear : function(){
            this.form_update_article.title = ''
            this.form_update_article.description = ''
            this.form_update_article.error_title=''
            this.form_update_article.error_description=''
        },
        update_article : function(){
          axios({
              method : 'PUT',
              url : `http://localhost:3000/articles/${this.article._id}`,
              headers : { jtoken : this.jtoken},
              data: {
                  title: this.form_update_article.title, description : this.form_update_article.description
              }
          })
          .then(  ( { data } ) =>{
              this.clear()
              this.form_update_article.succes = data.message
              $('#updateArticle').modal('hide')
              this.$emit('update_article')
          })
          .catch( ({ response }) => {
              let message = response.data.message
              this.form_update_article.error = message
          })
        },
        delete_article : function(){
          axios({
              method : 'DELETE',
              url : `http://localhost:3000/articles/${this.article._id}`,
              headers : { jtoken : this.jtoken},
          })
          .then(  ( { data } ) =>{
              this.clear()
              $('#deleteArticle').modal('hide')
              this.$emit('delete_article')
          })
          .catch( ({ response }) => {
              console.log(response)
              let message = response.data.message
              this.form_update_article.error = message
          })
        },
        add_comment : function(){
            this.$emit('add_comment')
        },
        update_comment : function(){
            this.$emit('update_comment')
        }
    }
}
</script>

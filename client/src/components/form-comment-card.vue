<template>
<div>
    <div class="row">
        <div class="col-2">
            <img :src="comment.user.avatar ? comment.user.avatar : 'https://cdn3.iconfinder.com/data/icons/business-and-finance-icons/512/Business_Man-512.png'" width="50px">
        </div>
        <div class="col-8">
            <h6 class="font-weight-bold text-capitalize">{{ comment.user.name }}</h6>
            <p> {{ comment.isi }}</p>
        </div>
        <div v-if="comment.user._id === user_id" class="col-2">
            <div class="dropdown">
                <a data-toggle="dropdown">
                    <img src="../assets/opition-icon.png" width="30px">
                </a>
                    <div class="dropdown-menu sm-3">
                        <a class="dropdown-item btn btn-primary" data-toggle="modal" type="button" data-target="#updateComment"> 
                            Update
                        </a>
                        <a class="dropdown-item"> Delete</a>
                    </div>
                </div>
            </div>
    </div>
     <div class="modal fade" id="updateComment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Comment Update</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="form-inline">
                        <input v-model="form_update_comment.isi" type="email" class="form-control" id="comment" placeholder="comment...">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="update_comment">Save changes</button>
                </div>
                </div>
            </div>
    </div>
</div>
</template>
<script>
export default {
    props : ['comment','jtoken', 'user_id'],
    data(){
        return{
            form_update_comment:{
                isi : this.comment.isi,
            }
        }
    },
    methods :{
         clear : function(){
            this.form_update_comment.isi = ''
        },
        update_comment : function(){
          axios({
              method : 'PUT',
              url : `http://localhost:3000/comments/${this.comment._id}`,
              headers : { jtoken : this.jtoken},
              data: {
                  isi: this.form_update_comment.isi
              }
          })
          .then(  ( { data } ) =>{
              this.clear()
              this.$emit('update_comment')
              $('#updateComment').modal('hide')
          })
          .catch( ({ response }) => {
              let message = response.data.message
              console.log(message)
          })
        }
    }
}
</script>

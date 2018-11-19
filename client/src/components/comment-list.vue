<template>
    <div class="container">
            <div class="border-0 p-0" v-for="(comment, index) in comments" :key="index">
              <commentcard :comment="comment" @update_comment="update_comment" :jtoken="jtoken" :user_id="user_id"></commentcard>
            </div>
    </div>
    
</template>
<script>
import commentcard from '@/components/form-comment-card.vue'
export default {
    props : ['jtoken','user_id','comments'],
    components : { commentcard },
    data(){
        return {
            
        }
    },
    methods : {
        update_comment : function(){
            this.$emit('update_comment')
        }
    }
}
</script>


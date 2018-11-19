<template>

      <div class="container mt-2">
        <div class="jumbotron p-md-5 bg-light rounded text-black">
            <div>
                 <h2> {{ article.title }}</h2>
                 <div class="mb-1 text-muted">{{ formatDate(article.createdAt)}}</div>
                 <div class="row text-wrap">
                    <p class="lead py-3 col-5">
                        {{ article.description }}
                    </p>
                 </div>
                
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props : ['jtoken'],
    data(){
        return {
            article : {}
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
        findArticle : function(){
            let id_article = this.$route.params.id
            axios({
                method: 'GET',
                url : `http://localhost:3000/articles/${id_article}`,
                headers : { jtoken : this.jtoken}
            })
            .then( ({ data }) => {
                console.log(data)
                this.article = data
            })
            .catch( error => {
                console.log( error )
            })

        }
    },
    watch : {
        $route (){
            console.log(this.findArticle)
            this.findArticle()
        }
    },
    created() {
        this.findArticle()
    },
    
}
</script>

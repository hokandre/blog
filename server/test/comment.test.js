const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect;

const User = require('../models/user')
const Comment = require('../models/comment')
const Article = require('../models/article')


const app = require('../app.js')



describe('Creating and read comment :', function(){
    
    before('creating user for creating article :', function( done ){
        chai.request(app)
            .post('/users/register')
            .send({ name : 'user testing creating article', password : '123', email : 'article@article.com'})
            .end(function(error, res){
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal('success')
                done()
            })
    })

    let token_creating_article = ''
    before('login  : ',function(done){
        chai.request(app)
        .post('/users/signin')
        .send({ email : 'article@article.com', password : '123' })
        .end( function( error, res){

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('token')
            token_creating_article = res.body.token
            expect(res.body.message).to.equal('success')
            done()
        })
    })

    after('deleteing user on creating comment', function(done){
        User.deleteOne({ email : 'article@article.com'})
            .then( response => {
                done()
            })
            .catch( error => {
                console.log( error.message )
            })
    })

    let id_article_test = ''
    before('create dummy article : ',function(done){
    
            Article.create({ title : 'test article', description : 'Hanya untuk test', auhtor : '6666'})
            .then(article => {
            id_article_test = article._id
            done()
            })
            .catch( error => {
                console.log( error )
            })
    })

   
   it('put : /articles/add-comment/:id_article', function(done){
    chai.request(app)
        .put(`/articles/add-comment/${id_article_test}`)
        .set({ jtoken : token_creating_article})
        .send( { isi : 'Mike :V'} )
        .end( function( error , res){
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('success')
            done()
        })
   })


})

describe('Update comment', function(){
    let user_id = ''
    before('creating dummy comment user :', function(done){
        User.create({ email :'comment@comment.com', name  : 'comment', password:'123'})
            .then( user => {
                user_id = user._id
                done()
            })
            .catch( error => {
                console.log( error.message)
            })
    })

    let token_update_comment =''
    before('login  : ',function(done){
        chai.request(app)
        .post('/users/signin')
        .send({ email : 'comment@comment.com', password : '123' })
        .end( function( error, res){

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('token')
            token_update_comment = res.body.token
            expect(res.body.message).to.equal('success')
            done()
        })
    })

    let comment_id = ''
    before('creating dummy comment :', function(done){
        Comment.create({ isi :'comment tester', user: user_id})
        .then( comment => {
            comment_id = comment._id
            done()
        })
        .catch( error => {
            console.log( error.message)
        })
    })

    let id_article_test = ''
    before('create dummy article : ',function(done){
    
        Article.create({ title : 'test article', description : 'Hanya untuk test', auhtor : '6666', comments: comment_id})
        .then(article => {
            id_article_test = article._id
            done()
        })
        .catch( error => {
            console.log( error )
        })
    })


    after('deleteing user on creating comment :', function(done){
        User.deleteOne({ email : 'comment@comment.com'})
            .then( response => {
                done()
            })
            .catch( error => {
                console.log( error.message )
            })
    })

    it('put : /articles/:id', function(done){
        chai.request(app)
            .put(`/comments/${comment_id}`)
            .set({ jtoken : token_update_comment})
            .send( { isi : 'updated'} )
            .end( function( error , res){
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('success')
                done()
            })
    })

    it('get : /comments/:id_comment', function(done){
        chai.request(app)
             .get(`/comments/${comment_id}`)
             .set({ jtoken : token_update_comment})
             .end( function(error, res){
                 expect(res).to.have.status(200)
                 expect(res.body).to.have.property('isi')
                 expect(res.body).to.have.property('user')
                 done()
             })
    })

    it('delete : /comments/:id_article/:id_comments', function(done){
        chai.request(app)
            .delete(`/comments/${id_article_test}/${comment_id}`)
            .set({ jtoken : token_update_comment})
            .end(function(error, res){
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('success')
                done()
            })
    })
})

  

    
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect;

let token = ''

const User = require('../models/user')

const Article = require('../models/article')

const app = require('../app.js')

describe('Creating and read article :', function(){
    let token_creating_article = ''
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
    before('login  : ',function(done){
            chai.request(app)
            .delete('/articles')
            .end( function(error, response){
                console.log('clearing all database !')

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
    })

    after('deleteing user on creating article', function(done){
        User.deleteOne({ email : 'article@article.com'})
            .then( response => {
                done()
            })
            .catch( error => {
                console.log( error.message )
            })
    })

   it('post : /articles', function(done){
    chai.request(app)
        .post('/articles')
        .set({ jtoken : token_creating_article})
        .send( { title : 'testing create aticle', description : 'ini adalah testing buat article'} )
        .end( function( error , res){
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('success')
            done()
        })
   })

   it('read : /articles', function(done){
    chai.request(app)
    .get('/articles')
    .set({ jtoken : token_creating_article})
    .end( function( error , res){
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.have.property('_id')
        expect(res.body[0]).to.have.property('comments')
        expect(res.body[0]).to.have.property('title')
        expect(res.body[0]).to.have.property('description')
        expect(res.body[0]).to.have.property('author')
        expect(res.body[0]).to.have.property('createdAt')
        done()
    })
   })
})

describe('Update article :', function(){
    let author_id = ''
    before('create author testing :', function(done){
        User.create({ name : 'user testing creating article', password : '123', email : 'article@article.com'})
            .then( user => {
                author_id = user._id
                done()
            })
            .catch( error => {
                console.log( error )
            })
    })

    let token_update_article =''
    before('login  : ',function(done){
        chai.request(app)
        .post('/users/signin')
        .send({ email : 'article@article.com', password : '123' })
        .end( function( error, res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('token')
            token_update_article = res.body.token
            expect(res.body.message).to.equal('success')
            done()
        })
    })

    let id_article_test = ''
    before('create dummy article for testing update :', function(done){
        Article.create({ title : 'test article update', description : 'Hanya untuk test update', author: author_id})
            .then(article => {
               id_article_test = article._id
               done()
            })
            .catch( error => {
                console.log( error )
            })
    })

    after('deleteing user on creating article', function(done){
        User.deleteOne({ email : 'article@article.com'})
            .then( response => {
                done()
            })
            .catch( error => {
                console.log( error.message )
            })
    })
    
    it('put : /articles/:id', function(done){
     chai.request(app)
         .put(`/articles/${id_article_test}`)
         .set({ jtoken : token_update_article})
         .send( { title : 'updated', description : 'article has been updated'} )
         .end( function( error , res){
             expect(res).to.have.status(200)
             expect(res.body).to.have.property('message')
             expect(res.body.message).to.equal('success')
             done()
         })
    })

    
    
 })

 describe('Deleting article :', function(){
     
 })




  

    
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect;

let token = ''


const app = require('../app.js')

describe('User testing :', function(){
    before('clear all data in database', function(done){
        chai.request(app)
            .delete('/users')
            .end( function(error, response){
                console.log('clearing all database !')
                
                chai.request(app)
                .post('/users/register')
                .send({ name : 'test1', password:'123', email:'test@test.com'})
                .end(function( error, res){
                    console.log( 'dummy creating user : ', res.body.message)
                    done()
                })

            })
    })

    it('if username,password,email null or empty must be return message : Invalid Input, status 400', function(done){
        chai.request(app)
            .post('/users/register')
            .send({ name : 'aaa', password : 'aaa', email : ''})
            .end(function(error, res){
                
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Invalid Input')
                done()
            })
    })

    it('if username, password, email are filled must be return status : 200 and email not registered', function( done ) {
        chai.request(app)
            .post('/users/register')
            .send({ name : 'andre', password: 'andre', email : 'hokandre@mhs.mdp.ac.id'})
            .end( function( error, res){

                expect(res).to.have.status(200)
                expect(res.body.message).to.equal('success')
                done()
            })
    })

    it('if username, password, email are filled but email has been registered must be return status : 400', function( done ) {
        chai.request(app)
            .post('/users/register')
            .send({ name : 'test1', password: '123', email : 'test@test.com'})
            .end( function( error, res){
                expect(res).to.have.status(400);
               
                expect(res.body.message).to.equal('Email Has Been Registered!')
                done()
            })
    })

    it('if username and password valid must return status 200 and { token}', function(done){
        chai.request(app)
            .post('/users/signin')
            .send({ email : 'hokandre@mhs.mdp.ac.id', password : 'andre' })
            .end( function( error, res){

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('token')
                token = res.body.token
                expect(res.body.message).to.equal('success')
                done()
            })
    })

    it('if user updated data with valid data must be return status 200 and { message : success }', function(done){
        chai.request(app)
        .put('/users/')
        .set({ jtoken : token})
        .send({ email : 'hokandre@mhs.mdp.ac.id', password : 'andre', name : 'bambang' })
        .end( function( error, res){

            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('success')
            done()
        })
    })

})

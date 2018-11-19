
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const Article = require('../models/article')
const Comment = require('../models/comment')

module.exports = {
    read: function(req, res){
       Article
            .find()
            .populate('author')
            .populate({
               path : 'comments',
               populate : {
                   path : ' user'
               }
            })
            .then( data => {
                let articles = data.map(datum => {
                    datum = datum.toJSON()
                   let comment_updated = datum.comments.map(comment =>{
                        delete comment.user.password
                        return comment
                    })
                    datum.comments = comment_updated
                    return datum
                })
                res.status(200).json( articles )
            })
            .catch( error => {
                console.log(error)
                res.status(500).json( { message : error.message})
            })
    },
    findArticle : function( req, res) {
        console.log('find')
        let article_id = req.params.id_article

        Article
            .findById( article_id )
            .populate('author')
            .populate('comments')
            .then( article =>{
                console.log(article)
                let data = article.toJSON()
                delete data.author.password
                
                res.status(200).json( data )
            })
            .catch( error =>{
                res.status(500).json({ message : error.message})
            })
    },
    clearAll : (req, res) => {
        Article.deleteMany()
            .then( response => {
                res.status(200).json({ message: 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    },
    create : (req, res) => {
        let title = req.body.title ? req.body.title : false
        let description = req.body.description ?  req.body.description : false
        let author = objectId(req._id)

        if ( !title || !description ){
            res.status(400).json({ message : 'Harap isikan data article secara lengkap!'})
        }else{
            let article = new Article({ title, description, author })

            article
                .save()
                .then( response => {
                    res.status(200).json({ message : 'success'})
                })
                .catch(error => {
                    res.status(500).json({ message : error.message})
                })
        }
    },
    updateArticle : (req, res) => {
        let articleId = req.params.id_article

        let data = req.body

        Article
            .findById( articleId )
            .then( article => {
                article.set(data)
                return article.save()
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
               
                res.status(500).json({ message : error.message })
            })
    },
    add_comment : (req, res) =>{
        let article_id = req.params.id_article

        let isi = req.body.isi
        let user = objectId(req._id)

        let comment = new Comment({ isi, user })

        Article
            .findById(article_id)
            .then( article =>{
                article.comments.push( comment._id)
                return Promise.all([article.save(), comment.save()])
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })



    }, 
    remove : (req, res) => {
        let id_article = req.params.id_article

        Article
            .findById( id_article)
            .then( article => {
                return article.remove()
            })
            .then( response => {
                res.status(200).json( { message : 'success'} )
            })
            .catch(error => {
                res.status(500).json({ message : error.message})
            })
    } 
}
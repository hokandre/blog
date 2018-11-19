
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const Article = require('../models/article')
const Comment = require('../models/comment')

module.exports = {
    clearAll : (req, res) => {
        Comment.deleteMany()
            .then( response => {
                res.status(200).json({ message: 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    },
    updateComment : (req, res) => {
        let commentId = req.params.id_comment

        let data = req.body

        Comment
            .findById( commentId )
            .then( comment => {
                comment.set(data)
                return comment.save()
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message })
            })
    },
    findComment : function( req, res) {
        let comment_id = req.params.id_comment

        Comment
            .findById( comment_id )
            .then( comment => {
                res.status(200).json( comment )
            })
            .catch( error => {
                res.status(500).json({ message : error.message })
            })
    },
    deleteComment : (req, res) => {
        let article_id = ObjectId(req.params.id_article)
        let comment_id = ObjectId(req.params.id_comment)

        let articelHasComment = null

        Article
            .findById( article_id )
            .then( article => {
                let commentSelected = article.comments.find(comment => {
                    return comment.equals(comment_id)
                })
                article.comments.pull(commentSelected)
                articelHasComment = article
                return Comment.findById(comment_id)
            })
            .then( comment => {
                return Promise.all([ articelHasComment.save(), comment.remove()])
            })
            .then( response =>{
                res.status(200).json({ message : 'success'})
            })
            .catch( error =>{
                res.status(500).json({ message : error.message })
            })
    }
}
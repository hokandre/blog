const { decoded } = require('../helpers/jasonWebToken')
const User = require('../models/user')
const Article = require('../models/article')
const Comment = require('../models/comment')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    isLogin : (req, res, next) => {
        
        let jtoken = req.headers.jtoken
        
        
        if ( jtoken ) {
            let user = decoded(jtoken)
            req._id = user._id
            console.log('Midleware : login valid!')
            next()
        }else {
            res.status(404).json({ massage : 'Belum Login', error : 'sorry, you are not logged in, please log in'})
        }

    },
    isTokenStillValid : (req, res, next) => {

        let _id = req._id

        User
            .findById(_id)
            .then( user => {
                if ( user) {
                    console.log('Midleware :token valid!')
                    next()
                }else {
                    res.status(500).json({ message : 'token tidak valid'})
                }
            })
    },
    isAuthorizeArticle :  (req,res, next) => {
        let user_id = ObjectId(req._id)
        let article_id = req.params.id_article
       
        Article
            .findById(article_id)
            .then( article => {
                let articleOwner = article.author
                let valid = articleOwner.equals(user_id)

                if ( valid ) {
                    console.log('Midleware : article authorzize valid!')
                    next()
                }else{
                    console.log('article not authorize')
                    res.status(500).json({message : 'Tidak memiliki otoritas!'})
                }
            })
            .catch(error => {
                res.status(500).json({ error : error.message})
            })

    },
    isAuthorizeComment :  (req,res, next) => {
        let user_id = ObjectId(req._id)
        let comment_id = req.params.id_comment
       
        Comment
            .findById(comment_id)
            .then( comment => {
                let commentOwner = comment.user
                let valid = commentOwner.equals(user_id)

                if ( valid ) {
                    console.log('Midleware : comment authorzize valid!')
                    next()
                }else{
                    console.log('comment not authorize')
                    res.status(500).json({message : 'Tidak memiliki otoritas!'})
                }
            })
            .catch(error => {
                res.status(500).json({ error : error.message})
            })

    },
}
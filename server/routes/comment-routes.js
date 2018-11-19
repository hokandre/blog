const Router = require('express').Router()

const { isLogin, isTokenStillValid, isAuthorizeComment } = require('../midleware/authenticate')

const {  findComment, deleteComment , updateComment, remove} = require('../controllers/comment')

Router.get('/:id_comment',isLogin,isTokenStillValid, findComment)
Router.delete('/:id_article/:id_comment',isLogin,isTokenStillValid,isAuthorizeComment, deleteComment)
Router.put('/:id_comment', isLogin,isTokenStillValid, isAuthorizeComment, updateComment)
//Router.delete('/:id_comment',isLogin,isTokenStillValid, isAuthorizeComment,remove)

module.exports = Router
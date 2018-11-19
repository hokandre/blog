const Router = require('express').Router()

const { isLogin, isTokenStillValid, isAuthorizeArticle } = require('../midleware/authenticate')

const { read , findArticle, clearAll, create , updateArticle, add_comment, remove} = require('../controllers/article')

Router.get('/', read)
Router.get('/:id_article',isLogin,isTokenStillValid, findArticle)
Router.delete('/', clearAll)
Router.post('/',isLogin,isTokenStillValid,create)
Router.put('/:id_article', isLogin,isTokenStillValid, isAuthorizeArticle, updateArticle)
Router.put('/add-comment/:id_article',isLogin,isTokenStillValid,add_comment)
Router.delete('/:id_article',isLogin,isTokenStillValid, isAuthorizeArticle,remove)

module.exports = Router
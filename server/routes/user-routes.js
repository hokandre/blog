const router = require('express').Router()

const { isLogin, isTokenStillValid } = require('../midleware/authenticate')

const { register, clearAll, signin, updateUser } = require('../controllers/user')

router.post('/register', register)
router.post('/signin', signin)
router.put('/',isLogin,isTokenStillValid, updateUser)


module.exports = router
const express = require('express')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(http)
require('dotenv').config()



const PORT = process.env.PORT || 3000


app.use(cors())
    .use(express.urlencoded({ extended : false}))
    .use(express.json())


const UserRoute = require('./routes/user-routes')
const ArticleRoute = require('./routes/article-routes')
const CommentRoute = require('./routes/comment-routes')

app.use('/users', UserRoute)
app.use('/articles', ArticleRoute)
app.use('/comments', CommentRoute)

io.on('connection', socket => {
    console.log('Chat Ready Using!')
})

http.listen(PORT, function(){
    console.log('Listening to port : ', PORT)
})


const mongoose = require('mongoose')

const DB_TYPE = process.env.NODE_ENV || "development"

mongoose.connect(`mongodb://localhost/blog_${ DB_TYPE }`, { useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error :'))

db.once('open', function(){
    console.log('database connected!')
})

module.exports = app



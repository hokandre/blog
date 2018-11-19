
const User = require('../models/user')

const mongoose = require('mongoose')

//json web token
const { encoded } = require('../helpers/jasonWebToken')

//bcrypt
const { comparePassword } = require('../helpers/brcyrpt')

module.exports =  {
    register : (req, res) => {
        let name = req.body.name ? req.body.name : false
        let email = req.body.email ? req.body.email : false
        let password = req.body.password ? req.body.password : false
      
        
        if ( !name || !email || !password ) {
            res.status(400).json({ message : 'Invalid Input'})
        }else {
            
            User
                .findOne({ email })
                .then( user => {
                    if( user ) {
                        res.status(400).json({ message : 'Email Has Been Registered!'})
                    }else {
                        let user = new User({ name, email, password })
                        return user.save()
                    }

                })
                .then( response => {
                    res.status(200).json({ message : 'success'})
                })
                .catch( error => {
                    res.status(500).json({ message : error.message})
                })

        }      
    },
    signin : (req, res) => {
        console.log('masuk sign in!')
        let email = req.body.email
        let password = req.body.password

        User
            .findOne({ email })
            .then( user => {
                if( user ) {
                    let validationPassword = comparePassword(password, user.password)
                    
                    if ( validationPassword ) {
                        let token = encoded({ _id : user._id, email : user.email})
                        res.status(200).json( {token, message : 'success', user_id: user._id} )
                    }else {
                    res.status(400).json({ message : 'password salah!'})
                    }
                }else{
                    res.status(400).json({ message : 'email tidak terdaftar!'})
                }
            })
            .catch( error => {
                console.log(error.message)
                res.status(500).json({ message : error.message })
            })
    },
    updateUser : (req, res) =>{
        let userId = req._id

        let password = req.body.password

        let data = req.body

        User
            .findById( userId )
            .then( user =>{
                user.set( data )
                return user.save()
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
            
    }

    
}
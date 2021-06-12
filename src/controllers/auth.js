const {user} = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {

        const data = req.body
        const {email, password} = req.body 

        const schema = joi.object({
            email: joi.string().email().min(8).required(),
            username: joi.string().min(6).required(),
            password: joi.string().min(8).required()
        }).validate(data)

        const { error } = schema

        if(error) {
            return res.send({
                status: 'validation failed',
                message: error.details[0].message
            })
        }

        const check = await user.findOne({
            where: {
                email
            }
        })

        if(check){
            return res.send({
                status: 'failed',
                message: 'Email Already registered'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await user.create({
            ...data,
            password: hashedPassword
        })

        res.send({
            status: 'success',
            data: {
                user: {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword
                }
            }
        })
        
    } catch (error) {
        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password, username } = req.body
        const data = req.body

        // Validate by username or email

        if (username) {

            const schema = joi.object({
                username: joi.string().required(),
                password: joi.string().min(8).required()
            }).validate(data)
            
            validate = schema.error

        } else if (email) {

            const schema = joi.object({
                email: joi.string().email().min(8).required(),
                password: joi.string().min(8).required()
            }).validate(data)

            validate = schema.error

        } else {

            return res.send({
                status: 'failed',
                message: 'Email or username is required'
            })

        }
        
        if (validate) {
            return res.send({
                status: 'Validation failed',
                message: validate.details[0].message
            })
        }
        
        //

        // Check email or username if exist

        if (username){
            check = await user.findOne({
                where: {
                    username
                }
            })
        } else {
            check = await user.findOne({
                where: {
                    email
                }
            })
        }


        if (!check) {
            return res.send({
                status: 'failed',
                message: 'Username or email not exist'
            })
        }

        //

        // Check password

        const isValidPassword = await bcrypt.compare(password, check.password)

        if (!isValidPassword) {
            return res.send({
                status: 'failed',
                message: 'Wrong password'
            })
        }

        //

        // Make a token for user

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({
            id: check.id
        }, secretKey)

        // User has login

        req.token = token

        res.send ({
            status: 'success',
            username: check.username,
            password: check.password,
            email: check.email,
            tokenId: token
        })
        
    } catch (err) {
        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })
    }
}
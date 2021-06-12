const express = require('express')

const router = express.Router()

// Wadah router/endpoin/url

const { getData,
        getDetail, 
        postData, 
        update, 
        deleteData } = require('../controllers/todo')

const { users, 
        addUser, 
        user, 
        updateUser, 
        userDelete,
        transacts,
        transact } = require('../controllers/user')

const { products, 
        addProduct } = require('../controllers/product')

const { orders } = require('../controllers/order')

const { register, login } = require('../controllers/auth')

const { auth } = require('../middleware/auth')

//order

router.post('/register', register)
router.post('/login', login)

//middleware

router.post('/login', login)

//order

router.get('/orders', orders)

//product

router.get('/user-products', auth, products)
router.post('/user-products', auth, addProduct)

//user

router.get('/user-transacts', transacts)
router.get('/user-transacts/:id', transact)
router.get('/users', users)
router.get('/user/:id', user)
router.post('/users', addUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', userDelete)

//todo

router.get('/', getData)
router.get('/data/:id', getDetail)
router.post('/data', postData)
router.patch('/data/:id', update)
router.delete('/data/:id', deleteData)

module.exports = router
const router = require('express').Router()
const Controller = require('../Controller/userController')
// const userController = require('../Controller/userController')
const {verifyAccessToken} = require('../middlewares/verifyToken')

 
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login', Controller.login)
router.get('/current', verifyAccessToken, Controller.getCurrent)
module.exports = router

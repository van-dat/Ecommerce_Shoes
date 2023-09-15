const router = require('express').Router()
const Controller = require('../Controller/userController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

 
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/current', verifyAccessToken, Controller.getCurrent)
router.put('/update-address', verifyAccessToken, Controller.updateUserAddress)
router.put('/cart', verifyAccessToken, Controller.updateCartProduct)
router.post('/refreshAccessToken', Controller.getAccessToken)
router.post('/logout', Controller.logout)
router.get('/forgotpassword', Controller.forgotPassword)
router.put('/resetpassword', Controller.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], Controller.getUsers)
router.delete('/delete', [verifyAccessToken, isAdmin], Controller.deleteUser)
router.put('/update-user', [verifyAccessToken], Controller.updateUser)
router.put('/update-user-admin/:uid', [verifyAccessToken, isAdmin], Controller.updateUser)


module.exports = router

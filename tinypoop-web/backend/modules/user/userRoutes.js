const express = require('express')
const router = express.Router()
const userController = require('./userController')

// กำหนดเส้นทาง
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/login', userController.login)
router.post('/', userController.createUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/register', authController.register)

module.exports = router
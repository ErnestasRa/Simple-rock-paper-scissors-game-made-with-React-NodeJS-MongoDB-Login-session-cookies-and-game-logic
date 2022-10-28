const express = require('express')
const router = express.Router()
const {emailValid, passwordValid, isSecretValid} = require('../middleware/middle')
const {register, login, postuser, createpost, mainpage, sendmessage, allmessages, userLogin, allplayers, playgame, setwinner} = require('../controllers/main-controller')

router.post('/register', emailValid, passwordValid, register)
router.post('/login', emailValid, userLogin)
router.get('/allplayers', allplayers)
router.post('/playgame', playgame)
router.post('/setwinner', setwinner)
module.exports = router
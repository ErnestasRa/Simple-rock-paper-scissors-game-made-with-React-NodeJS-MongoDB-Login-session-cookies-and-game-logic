const validator = require('email-validator');
const sendRes = require('../modules/universal-res')
const bcrypt = require('bcrypt')

function hasUpperCase(str){
    return str !== str.toLowerCase()
}

module.exports = {
    emailValid: (req, res, next) => {
      const {email} = req.body
      if(!validator.validate(email)) return sendRes(res, true, 'bad email', null)
     
      next()
    },
    passwordValid: (req, res, next) => {
      const {password, confirmPassword} = req.body

      if(password !== confirmPassword)  return sendRes(res, true, 'passwords do not match', null)
       
      if(confirmPassword.length < 5 || confirmPassword.length > 100) return sendRes(res, true, 'bad password input', null)

      if(password.length < 5 || password.length > 100) return sendRes(res,true, 'password is too long or too short', null)

      next()
    },
    isSecretValid: (req, res, next) => {
      const { secret } = req.body
      
      if(!secret) return res.send({error: 'User not logged in'})
        
      next()
    }

  }
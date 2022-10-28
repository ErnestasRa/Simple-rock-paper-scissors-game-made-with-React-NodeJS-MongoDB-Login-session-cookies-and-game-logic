const gameSchema = require('../schemas/gameSchema')
const bcrypt = require('bcrypt')
const { uid } = require('uid')
const sendRes = require("../modules/universal-res")
const session = require('express-session')

module.exports = { 
    register: async (req, res) => {
        const {email, password} = req.body

        const hash = await bcrypt.hash(password, 10)

             async function newUser() {
                const user = new gameSchema({
                    email: email,
                    password: hash,
                    score: 0,
                })
                console.log(user)
                req.session.user = user
                const member = await user.save()
             }
             sendRes(res, false, 'user created', {OK: 'OK'})
             newUser()
    },
    userLogin: async(req, res) => {
        const {email, password} = req.body
        const foundUser = await gameSchema.findOne({email})

        if(foundUser) {
            const compare = await bcrypt.compare(password, foundUser.password)
            if(compare) {
                req.session.user = foundUser
                return sendRes(res, false, 'successfully logged in?', null)
            } else {
                return sendRes(res, true, 'bad user credentials', null)
            }
        }
        res.send()
    },
    allplayers: async(req, res) => {
        if(req.session.user){
            const allPlayers = await gameSchema.find({})
            sendRes(res, false, 'all players:', allPlayers)
        } else {
            return sendRes(res, true, 'you need to be logged in', null)
        }
    },
    playgame: async(req,res) => {
        const {email} = req.body
        const playerInfo = await gameSchema.find({email})
        if(req.session.user){
            return sendRes(res, false, 'player info:', {playerInfo: playerInfo, session: req.session.user})
        } else {
            return sendRes(res, true, 'you need to be logged in', null)
        }
    },
    setwinner: async(req, res) => {
        const {email} = req.body
        const playerInfo = await gameSchema.findOneAndUpdate(
            {email: email},
            {$inc: {score: 1}},
            {new: true}
        )
        res.send({success: true})
    }
}


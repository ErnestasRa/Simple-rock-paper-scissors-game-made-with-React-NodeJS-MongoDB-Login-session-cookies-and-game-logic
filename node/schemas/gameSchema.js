const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
})

const exportUser = mongoose.model('newGameSchema', gameSchema)

module.exports = exportUser
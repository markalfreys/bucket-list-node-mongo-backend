const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
    item: String,
    status: {
        type: String,
        default: 'Pending'
    }
},{ timestamps: true })

const List = mongoose.model('List', listSchema)

module.exports = List
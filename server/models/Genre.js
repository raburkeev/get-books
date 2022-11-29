const {Schema, model} = require('mongoose')

const schema = new Schema({
    color: {type: String, required: true},
    name: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('Genre', schema)
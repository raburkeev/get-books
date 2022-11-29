const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    img: String,
    isAdmin: {type: Boolean},
    cart: [{type: Schema.Types.ObjectId, ref: 'Book'}]
}, {
    timestamps: true
})

module.exports = model('User', schema)
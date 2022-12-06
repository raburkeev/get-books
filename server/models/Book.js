const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    author: {type: String},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre'},
    description: {type: String},
    ageLimit: {type: String,  enum: ['0+', '6+', '12+', '16+', '18+']},
    imgUrl: {type: String},
    price: {type: Number},
    ratings: {type: Object},
    series: {type: String},
    size: {type: Number},
    year: {type: Number}
}, {
    timestamps: true
})

module.exports = model('Book', schema)
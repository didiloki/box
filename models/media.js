const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema({
    name : { type : String },
    url : { type : String },
    type: {type : String },
    created_at : { type : Date, default : Date.now }
})

const Media = mongoose.model('Media', mediaSchema, 'medias')
module.exports = Media

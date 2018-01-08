const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname : { type : String },
    lastname : { type : String },
    username : {
      type : String,
      unique: true,
      required : [ true, 'Username Cannot be empty'] },
    playlists : [
      { type : Schema.Types.ObjectId , ref : 'Playlist' }
    ]

})

const User = mongoose.model('User', userSchema)
module.exports = User

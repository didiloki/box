const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name : { type : String },
    media : [
      { type : Schema.Types.ObjectId, ref : 'Media' }
    ],
    user : { type : Schema.Types.ObjectId , ref : 'User' }
})

const Playlist = mongoose.model('Playlist', playlistSchema)
module.exports = Playlist

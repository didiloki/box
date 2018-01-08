const express = require('express')
const router = express.Router()

//-----Models ---//
const User = require('../models/user')
const Media = require('../models/media')
const Playlist = require('../models/playlist')


router.get('/', (req, res) => {
  res.status(200).send({message:'Welcome to aBOX24'})
})


//Add New Media
router.post('/media/new', (req, res) =>{
  //get post information
  let media = new Media({
    name  : req.body.media_name,
    type : req.body.media_type,
    url : req.body.media_url
  })

  media.save((err)=>{
    if (err) return res.send({ message : 'Media Not Added!'})

    res.json({ message: 'Media Added!'})
  })

})

// get all media
router.get('/media', (req, res)=>{
  //get all media
  Media.find({}).exec((err, media)=>{
    if(err) return res.status(500).send({message : 'Please Check Request'})

    res.json(media)
  })
})

// get all audio or video
router.get('/media/:type', (req, res)=>{
  //get all media
  Media.find({type : req.params.type}).exec((err, media)=>{
      if(err) return res.status(500).send({message : 'Please Check Request'})

      res.json(media)
  })
})

//Get PlayList by Name
router.get('/playlist/:name', (req, res)=>{

  let playlist_name = req.params.name

  Playlist.findOne({name : playlist_name.toLowerCase()})
  .populate('user')
  .populate('media')
  .exec((err, playlist)=>{
    if(err) return res.send({message : "Nothing Found!"})
    res.json(playlist)
  })

  // res.status(200).send({name: playlist_name})
})

//Create PlayList
router.post('/playlist/new/:username', (req, res)=>{
  //user must send a post request with
  // current username and playname
  //check if user exists then create playlist
  let username = req.params.username
  User.findOne({username : username.toLowerCase()})
  .exec()
  .then((user)=>{
    let playlist = new Playlist({
      name : req.body.playlist_name,
      user : user._id
    })

      playlist.save((err)=>{
        if (err) return res.send({ message : 'Playlist Not Created'})

        //add new playlists to user model
        User.findByIdAndUpdate(user._id, {$push : {playlists : playlist._id}}).exec(
          (errors, user)=>{
            if(errors) return res.send('err')
              res.json({ message: 'Playlist created!' })
          }
        )

      })

  }, (err)=>{
    res.send({ message : 'Playlist Not Created'})
  })



})

//add media to playlist
router.put('/playlist/:name/', (req, res)=>{

  //check media list
  if(req.body.media != '' || req.body.media != null ){

    let new_media = req.body.media

    //get the playlist
    Playlist.findOneAndUpdate({name : req.params.name},
    {$push : {new_media}})
    .exec((err, playlist)=>{
      if(err) return res.status(500).send({ message : 'Playlist Not Found'})

      res.send({message : "ok"})
    })

  }
})



//Get User and Playlists
router.get('/user/:username', (req, res)=>{

    let username = req.body.username

    User.find({username : username})
    .populate('playlists')
    .exec((err, user)=>{
      if(err) return res.send({message : 'Error Finding User!'})

      if(!user) return res.send({message : 'User Doesnt Exist!'})

      res.json(user)
    })
})


//Post New User
router.post('/user/new', (req, res) =>{
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let username = req.body.username

  let user = new User({
    firstname : req.body.firstname,
    lastname  : req.body.lastname,
    username : req.body.username
  })

    user.save((err)=>{
      if (err) return res.send({ message : 'User Not Created'})

      res.json({ message: 'User created!' })
    })

  })

module.exports = router

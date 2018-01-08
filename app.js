const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const express = require('express')

const MongoStore = require('connect-mongo')(session)
const setup = require("./config/setup")
const multer = require('multer')


///------------App Start -----//
const app = express()
const PORT = process.env.PORT || setup.PORT

const routes = require('./routes/routes')


//---Mongoose ----//
mongoose.Promise = global.Promise
mongoose.connect((setup.MONGODB_LIVE), { useMongoClient : true })
.then(()=>{ console.log("-- Mongoose ok ---")}, (err) =>{ console.log(err) } )

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json())// get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public'))) //Set static path to public


// routes ===============================================================
app.use('/api', routes)


app.listen(PORT,()=>{
  console.log('--+ started +--');
})

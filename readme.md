# Video Playlist + Simple Player

This app allows users create a playlist of both videos and audios from already existing database.
This app consists of thress collections
  - Medias - containers all the types of media
  - Users - consists of all users
  - Playlist - all playlists with or without media

## API Routes Description
This is how to navigate the app. The app is hosted on heroku for test viewing and has no JWT or OAuth for simplicity
### Media Route
#### To view all media
``` GET: /api/media  ```
This return all media in the application

#### To add new media to app
``` POST: /api/media/new ```
Posts media details to the application
This takes the follow as post request:
###### (all post field must have the following names)
 -  media_name (String)
 - media_type (audio/ video)
 - media_url (url)
### Playlists
To view Single playlists
```GET: /api/playlist/:name```
name here refers to the name of the playlist.
This returns the playlist with the name in the url parameter

### Create a new playlist
```POST: /api/playlist/new/:username/```
The name of playlist must be passed as a post request with name
"playlist_name"
if a sucess it returns a message with success

### Add Music to Playlist
```PUT: /api/playlist/:name ```
all new media must be sent in a put request and field name must be "media"

### Users
```GET: /api/user/:username```
This return user with all details


```sh
$ cd aboxmusic
$ yarn install
$ node app
```

### Tech

aboxmusic uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Yarn] - the package manager
* [MongoDB] Database
* [Mongoose] - Mongoose as ORM


### Installation

This app requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd aboxmusic
$ yarn install
$ node app
```

Run App:
```sh
$ node app
```

```sh
127.0.0.1:4000
```

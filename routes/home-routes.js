const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { User, Playlist, Genre } = require("../models");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/homepage/:id", (req, res) => {
  var id = req.params.id;
Playlist.findAll()
  .then((playlistData) => {
    var playlist_names = [];
    var playlist = [];
    playlistData.forEach(element => {
      playlist_names.push({
          id: element.id,
          names: element.playlist_name,
        });
        if(element.id == id) {
          playlist.push({
              id: element.id,
              info: element.songs.split(","),
            });
        }
    })    
    res.render("homepage", {
      playlist_names: playlist_names,
      playlist: playlist
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/homepage", withAuth, (req, res) => {
  Playlist.findAll({
    where: {
      user_id: req.session.user_id,
    }
  })
    .then((dbUserData) => {
      var playlist_names = [];
      var playlist = [];
      dbUserData.forEach(element => {
        playlist_names.push({id: element.id, names: element.playlist_name})
        playlist.push({id: element.id, info: element.songs.split(',')})
      })
      res.render("homepage", {
        playlist_names: playlist_names
        // playlist: playlist
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  res.redirect("login");
});

module.exports = router;

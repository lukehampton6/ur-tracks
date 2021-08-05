const router = require("express").Router();
const axios = require("axios");
const Playlist = require("../../models/Playlists");

router.get("/findall", (req, res) => {
  Playlist.findAll().then((dbData) => {
    res.json(dbData);
  });
});

//delete a playlist
router.delete("/:id", (req, res) => {
  Playlist.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((playlistData) => {
      if (!playlistData) {
        res.status(404).json({ message: "No playlist found :(" });
        return;
      }
      res.json(playlistData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a playlist
router.put("/:id", (req, res) => {
  Playlist.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((playlistData) => {
      if (!playlistData) {
        res.status(404).json({ message: "No playlist found :(" });
        return;
      }
      res.json(playlistData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one playlist
router.get("/:id", (req, res) => {
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
        playlist: playlist.info,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/search", (req, res) => {
  var userSearch = req.body.userSearch;
  var artistInfo = [];
  axios.get(`http://api.deezer.com/search?q=${userSearch}`).then((response) => {
    var data = response.data.data;
    data.forEach((element) => {
      artistInfo.push({ name: element.artist.name, song: element.title });
    });
    return res.send(artistInfo);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post("/create_playlist", (req, res) => {
  Playlist.create({
    playlist_name: req.body.playlist_name,
    songs: req.body.songs,
    user_id: req.session.user_id,
  }).then((dbUserData) => {
    console.log(dbUserData);
    res.json(dbUserData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

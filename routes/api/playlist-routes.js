const router = require("express").Router();
const axios = require("axios");
const Playlist = require("../../models/Playlists");

// create a new playlist
router.post("/", (req, res) => {
  Playlist.create({
    playlist_name: req.body.playlist_name,
    songs: req.body.songs,
    user_id: req.session.user_id,
  })
    .then((playlistData) => res.json(playlistData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
  Playlist.findOne({
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

router.post("/search", (req, res) => {
  var userSearch = req.body.userSearch;
  var artistInfo = [];
  axios.get(`http://api.deezer.com/search?q=${userSearch}`).then((response) => {
    var data = response.data.data;
    data.forEach((element) => {
      artistInfo.push({ name: element.artist.name, song: element.title });
    });
    console.log(artistInfo);
    // console.log(data);
    return res.send(artistInfo);
  });
});

router.post("/create_playlist", (req, res) => {});

module.exports = router;

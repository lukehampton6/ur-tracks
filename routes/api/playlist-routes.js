const router = require("express").Router();
const Playlist = require("../../models/Playlists");

// create a new playlist
router.post('/', (req, res) => {
    Playlist.create({
        //playlist model structure
    })
    .then((playlistData) => res.json(playlistData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a playlist
router.delete('/:id', (req, res) => {
    Playlist.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((playlistData) => {
        if (!playlistData) {
            res.status(404).json({ message: 'No playlist found :('});
            return;
        }
        res.json(playlistData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

// update a playlist
router.put('/:id', (req, res) => {
    Playlist.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((playlistData) => {
        if (!playlistData) {
            res.status(404).json({ message: 'No playlist found :('});
            return;
        }
        res.json(playlistData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

// get one playlist
router.get('/:id', (req, res) => {
    Playlist.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((playlistData) => {
        if (!playlistData) {
            res.status(404).json({ message: 'No playlist found :('});
            return;
        }
        res.json(playlistData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
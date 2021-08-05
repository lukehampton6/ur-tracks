const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Playlist, Genre } = require("../models");

router.get("/", (req, res) => {
    res.render('login');
  });

router.get("/signup", (req, res) => {
    res.render('signup');
})

router.get("/:username", (req, res) => {
  User.findOne({
    where: {
      username: req.params.user_email,
    },
    include: [
      {
        model: Playlist
      }
    ]
  })
    .then((dbUserData) => res.render("homepage", dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

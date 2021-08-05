const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { User, Playlist, Genre } = require("../models");

router.get("/login", (req, res) => {
  res.render("login");
});

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

router.get("/homepage", (req, res) => {
  console.log(req.session);
  User.findAll({
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Playlist,
      },
    ],
  })
    .then((dbUserData) => {
      res.render("homepage");
      console.log(dbUserData, req.session);
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

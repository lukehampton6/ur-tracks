const router = require("express").Router();
const User = require("../../models/Users");

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
  })
    .then((dbUserData) => res.render("homepage", dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

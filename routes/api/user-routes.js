const router = require("express").Router();
const User = require("../../models/Users");

router.get("/", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((oneUser) => {
    res.json(oneUser);
  });
});

router.post("/", (req, res) => {
  User.create({
    user_email: req.body.user_email,
    password: req.body.password,
  })
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbUpdate) => {
    res.json(dbUpdate);
  });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbDelete) => {
    res.json(dbDelete);
  });
});

module.exports = router;

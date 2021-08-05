const router = require("express").Router();
const User = require("../../models/Users");

// router.get("/", (req, res) => {
//   User.findAll({
//     attributes: { exclude: ["password"] },
//   })
//     .then((userData) => res.json(userData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.get("/:id", (req, res) => {
//   User.findOne({
//     where: {
//       id: req.params.id,
//     },
//   }).then((oneUser) => {
//     res.json(oneUser);
//   });
// });

// router.post("/", (req, res) => {
//   User.create({
//     user_email: req.body.user_email,
//     password: req.body.password,
//   })
//     .then((dbUser) => {
//       res.json(dbUser);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      user_email: req.body.user_email,
    },
  }).then((dbUserData) => {
    console.log(dbUserData, req.session);
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.user_email = dbUserData.user_email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/signup", (req, res) => {
  User.create({
    user_email: req.body.user_email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.user_email = dbUserData.user_email;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
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

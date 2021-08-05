const router = require("express").Router();
const apiRoutes = require("./api");
const renderRoutes = require('./home-routes.js')

router.use("/api", apiRoutes);
router.use('/', renderRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

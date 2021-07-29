const User = require("../models");

const userData = [
  {
    user_email: "joshuarosamktp4@gmail.com",
    password: "12345",
  },
  {
    user_email: "johndoe@gmail.com",
    password: "tacoLover123",
  },
];

const seedUser = async () => User.bulkCreate(userData);

module.exports = { seedUser };

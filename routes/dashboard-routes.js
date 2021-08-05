const router = require('express').Router();
const sequelize = require('../config/connection');
const { Playlist, User } = require('../models');
const withAuth = require('../utils/auth');


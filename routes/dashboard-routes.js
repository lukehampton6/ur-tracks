const router = require('express').Router();
const sequelize = require('../config/connection');
const { Playlist, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Playlist.findAll({
        where:{
            user_id: req.session.user_id
        }
    }).then(data => {
        console.log(data)
        var recipe=[]
        data.forEach(element => {
            recipe.push({id:element.id, name: element.name, ingredients: [{ itemIngredient: element.ingredients.split(',') }], amount: [{ itemAmount: element.amounts.split(',') }], steps: [{ itemStep: element.steps.split(',') }], videoLink: element.videoLink, videoImage:element.videoImage  })
        })
        console.log(recipe)
        res.render('kitchen', { recipe: recipe, loggedIn: req.session.loggedIn })
    })
})
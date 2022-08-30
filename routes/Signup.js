const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Signup =require('../models/Signup')

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup')
})

//to fill in a form /edit
router.post('/signup', async(req, res) => {
    const signup = new Signup(req.body);
    console.log(req.body)
    await Signup.register(signup, req.body.password, (err) => {
        if (err) {
            res.status(400).render('signup')
            console.log(err)
        } else {
            res.redirect('/login')
        }
    })

});


router.get('/users', async (req, res) => {
    let items = await Signup.find();

    res.render('users', {users: items})
})






module.exports = router
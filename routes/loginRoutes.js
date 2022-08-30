const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// const Manager =require('../models/Manager')
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', passport.authenticate('local',{failureRedirect:'/login'}),
(req,res)=>{
    
        res.redirect('/users')
    
});

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})

module.exports = router
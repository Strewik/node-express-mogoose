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




//Update things

router.get('/users', async (req, res) => {
    let items = await Signup.find();

    res.render('users', {users: items})
})


router.get('/editUser/:id', async(req, res) => {
    try{
      const item = await Signup.findOne({_id:req.params.id});
      res.render('editUser', {user:item});
    }
    catch(error){
      res.send("User not found in DB");
    }
    });
//update Routes
router.post('/editedUser', async(req, res) => {
    try{
      await Signup.findOneAndUpdate({_id:req.query.id},req.body);
      
      res.redirect('/users');
    }
    catch(error){
      res.send("Failed to update users");
      console.log(error);
    }
   });  




module.exports = router
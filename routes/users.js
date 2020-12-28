const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const userModel = require('../models/user');

// get all users data
router.get('/get',(req, res) => {
  userModel.find().exec(function(err, usersData) {
    if(err)console.log("Error Retrieving USERS Data: "+err);
    else {res.json(usersData);}
  })
});

// get user data by ID
router.get('/:id', (req, res) => {
  userModel.findOne({id: req.params.id}).exec(function(err, userData) {
    if(err) {
      console.error(`Error Retrieving USER Data for ID: ${req.params.id} `,err);
      res.send(500);
    }
    else { res.json(userData); }
  });
});

// get given feedback by ID
router.get('/feedback/:id',(req, res) => {
  userModel.findOne({id: req.params.id}).exec(function(err, userData) {
    if(err) { console.error(`Error Retrieving USER Data for ID: ${req.params.id} `,err);
    res.send(500);
    } else { res.json(userData.feedbackGiven); }
  });
})

// get received feedback by ID
router.get('/feedback/received/:id', (req, res) => {
  userModel.findOne({id: req.params.id}).exec(function(err, userData) {
    if(err) {
      console.error(`Error Retrieving USER Data for ID: ${req.params.id} `,err);
      res.send(500);
   }
    else { res.json(userData.feedbackReceived); }
  });
})

router.put('/feedback/:id', (req, res) => {
  if (req.body) {
    const rider = req.body;
    if (rider.id && rider.name && rider.feedback && rider.stars) {
      userModel.updateOne({"id":req.params.id},
      {$push:
          {"feedbackGiven":{riderId: rider.id, riderName: rider.name, feedback: rider.feedback, stars: rider.stars}}
      },
      (err) => {
        if(err){
          console.log('Error encountered: ',err);
          res.sendStatus(500);
          return;
         }
        }
      )
    } else {
      res.sendStatus(400);
      return;
    }
  }
  res.sendStatus(200);
})

module.exports=router;
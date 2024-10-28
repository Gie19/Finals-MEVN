const express = require('express');
const profileRoute = express.Router();
let ProfileModel = require('../models/Profile');



// Create a new profile
profileRoute.route('/create-profile').post(async (req, res, next) => {
  try {
      const data = await ProfileModel.create(req.body);
      res.json(data);
      console.log('Profile successfully created!');
  } catch (error) {
      return next(error);
  }
});


//Get all profiles
profileRoute.route('/all-profile').get(async (req, res, next) => {
    try {
        const data = await ProfileModel.find();
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

// Get a specific profile by ID
profileRoute.route('/select-profile/:id').get(async (req, res, next) => {
    try {
      const data = await ProfileModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
});

// Update profile
profileRoute.route('/update-profile/:id').put(async (req, res, next) => {
    try {
      const data = await ProfileModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.json(data);
      console.log('Profile successfully updated!');
    } catch (error) {
      return next(error);
    }
});



module.exports = profileRoute;
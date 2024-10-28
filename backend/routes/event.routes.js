const express = require('express');
const eventRoute = express.Router();
let EventModel = require('../models/Event');


//Create a new event 
eventRoute.route('/create-event').post(async (req, res, next) => {
  try {
    const data = await EventModel.create(req.body);
    res.json(data);
  } catch (error) {
    return next(error);
  }
});



//Get all events
eventRoute.route('/all-events').get(async (req, res, next) => {
    try {
        const data = await EventModel.find();
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

// Get a specific event by ID
eventRoute.route('/select-event/:id').get(async (req, res, next) => {
    try {
      const data = await EventModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  });


// Update an event
eventRoute.route('/update-event/:id').put(async (req, res, next) => {
    try {
      const data = await EventModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.json(data);
      console.log('Event successfully updated!');
    } catch (error) {
      return next(error);
    }
});

// Delete
eventRoute.route('/delete-event/:id').delete(async (req, res, next) => {
  try {
    const data = await EventModel.findByIdAndDelete(req.params.id);  // Use findByIdAndDelete
    if (!data) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json({ msg: "Event deleted successfully", data });
  } catch (error) {
    return next(error);
  }
});

module.exports = eventRoute;
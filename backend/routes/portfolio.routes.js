const express = require('express');
const portfolioRoute = express.Router();
let PortfolioModel = require('../models/Portfolio');

//Add to portfolio 
portfolioRoute.route('/add-portfolio').post(async (req, res, next) => {
    try {
      const data = await PortfolioModel.create(req.body);
      res.json(data);
    } catch (error) {
      return next(error);
    }
});

//Get all portfolio
portfolioRoute.route('/all-portfolios').get(async (req, res, next) => {
    try {
        const data = await PortfolioModel.find();
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

// Get a specific portfolio by ID
portfolioRoute.route('/select-portfolio/:id').get(async (req, res, next) => {
    try {
      const data = await PortfolioModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  });

// Delete
portfolioRoute.route('/delete-portfolio/:id').delete(async (req, res, next) => {
    try {
      const data = await PortfolioModel.findByIdAndDelete(req.params.id);  // Use findByIdAndDelete
      if (!data) {
        return res.status(404).json({ msg: "Portfolio not found" });
      }
      res.status(200).json({ msg: "Porfolio deleted successfully", data });
    } catch (error) {
      return next(error);
    }
});
module.exports = portfolioRoute;
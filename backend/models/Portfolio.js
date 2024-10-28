const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let portfolioSchema = new Schema({
    image: {
        type: String
    }
}, {
    collection: 'portfolio'
});

module.exports = mongoose.model('Portfolio', portfolioSchema)


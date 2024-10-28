const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let eventSchema = new Schema({
    name: {
        type: String
    },
    venue: {
        type: String
    },
    address: {
        type: String
    },
    date: {
        type: Date
    },
    description: {
        type: String
    },

    image: {
        type: String
    }
}, {
    collection: 'event'
});

module.exports = mongoose.model('Event', eventSchema)


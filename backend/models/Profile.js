const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let profileSchema = new Schema({
    name: {
        type: String,
    },

    address: {
        type: String,
      
    },
    image: {
        type: String,

    }
    
}, {
    collection: 'profile'
});

module.exports = mongoose.model('Profile', profileSchema)


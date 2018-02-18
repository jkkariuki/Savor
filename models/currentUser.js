const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const currentUser = new Schema({
    userID: {
        type: String, 
        required: true
    }
  
})

module.exports =  mongoose.model('currentUser', currentUser);
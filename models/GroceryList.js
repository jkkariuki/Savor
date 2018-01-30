const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GroceryListSchema = Schema({
//   user: {
//       type: ObjectId,
//       ref: "User" // <- whatever the name of your User model is
//   },
  items: [{
    name: {type: String, required: true},
    purchased: {type: Boolean, default: false}
  }]
})

module.exports = mongoose.model('GroceryList', GroceryListSchema);
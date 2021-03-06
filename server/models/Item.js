const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  foodId: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  preferredMeasure: {
    type: String,
    required: true,
  },
  weightPerMeasure: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Item', ItemSchema);

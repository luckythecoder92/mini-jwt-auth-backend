const mongoose = require('mongoose');
const salesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped"],
    required: true,
  },
});

module.exports = mongoose.model("Sales", salesSchema);
const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("planet", planetSchema);

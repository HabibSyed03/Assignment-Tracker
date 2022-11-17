var mongoose = require("mongoose");

var assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Assignment", assignmentSchema);
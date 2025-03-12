const mongoose = require("mongoose");

const task = new mongoose.Schema({
  title: String,
  description: String,
  Status: Boolean,
  Important: Boolean,
});

const Task = mongoose.model("Task", task);
module.exports = Task;

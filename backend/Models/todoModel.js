const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
	task: String,
	isCompleted: {
		type: Boolean,
		default: false,
	},
});

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;

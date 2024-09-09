const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoModel = require("./Models/todoModel");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/newDatabase", {});

// Get all tasks
app.get("/get", async (req, res) => {
	try {
		const result = await todoModel.find();
		res.json(result);
	} catch (err) {
		console.error("Error fetching tasks:", err);
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
});

// Add a new task
app.post("/add", async (req, res) => {
	const task = req.body.task;
	try {
		const result = await todoModel.create({ task });
		res.json(result);
	} catch (err) {
		console.error("Error adding task:", err);
		res.status(500).json({ error: "Failed to add task" });
	}
});

app.put("/update/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid ID format" });
	}

	try {
		const task = await todoModel.findById(id);
		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}

		const updatedTask = await todoModel.findByIdAndUpdate(
			id,
			{ isCompleted: req.body.isCompleted },
			{ new: true }
		);

		res.json({
			message: "Task updated successfully",
			task: updatedTask,
		});
	} catch (err) {
		console.error("Error updating task:", err);
		res.status(500).json({ error: "Failed to update task" });
	}
});

app.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid ID format" });
	}

	try {
		const result = await todoModel.findByIdAndDelete(id);
		if (!result) {
			return res.status(404).send("Todo not found");
		}

		res.send("Todo deleted");
	} catch (err) {
		res.status(500).send(err.message);
	}
});


app.listen(3000, () => {
	console.log("Server running on port 3000");
});

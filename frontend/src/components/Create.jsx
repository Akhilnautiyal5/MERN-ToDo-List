import React, { useState } from "react";
import axios from "axios";

const Create = ({ onAdd }) => {
	const [task, setTask] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAdd = async () => {
		if (!task.trim()) {
			console.log("Input is empty, task not added");
			return;
		}

		const newTask = {
			task,
			isCompleted: false,
		};

		setLoading(true); // Set loading state

		try {
			// Send task creation request to backend
			const result = await axios.post("http://localhost:3000/add", newTask);
			const createdTask = result.data; // Get the new task with its generated _id

			// Add the task with the backend-assigned _id to the state
			onAdd(createdTask);

			setTask(""); // Clear the input field
		} catch (err) {
			console.error("Error adding task:", err);
			// Optionally revert local state or show an error message
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<div className="flex outline-none bg-zinc-800 rounded-full text-white w-fit mt-6">
			<input
				name="task"
				className="bg-transparent w-96 px-6"
				type="text"
				placeholder="Input your task"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				disabled={loading} // Disable input when loading
			/>
			<button
				className="bg-yellow-500 rounded-full text-white w-20 h-14 active:bg-yellow-400"
				type="button"
				onClick={handleAdd}
				disabled={loading} // Disable button when loading
			>
				Add
			</button>
		</div>
	);
};

export default Create;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";
import check from "../assets/check.svg";
import uncheck from "../assets/uncheck.svg";
import delete_icon from "../assets/delete.svg";

const Home = () => {
	const [Todo, setTodo] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/get")
			.then((result) => setTodo(result.data))
			.catch((err) => console.log(err));
	}, []); // Empty dependency array to run only on mount

	const handleAdd = (newTask) => {
		setTodo((prevTodo) => [...prevTodo, newTask]);
	};

const handleEdit = (id, isComplete) => {
	//   const validId = String(id); // Ensure it's a string
	console.log(id);
	
  axios
    .put(`http://localhost:3000/update/${id}`, { isCompleted: !isComplete })
    .then((result) => {
      setTodo((prevTodo) =>
        prevTodo.map((task) =>
          task._id === id ? { ...task, isCompleted: !isComplete } : task
        )
      );
    })
    .catch((err) => {
      console.error(
        "Error updating todo:",
        err.response ? err.response.data : err.message
      );
    });
};


	const handleDelete = (id) => {
		axios
			.delete("http://localhost:3000/delete/" + id)
			.then((result) => {
				// console.log(result);
				setTodo((prevTodo) => prevTodo.filter((task) => task._id !== id));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="bg-zinc-700 h-screen w-screen font-serif flex flex-col items-center text-white">
			<h1
				id="title"
				className="border-r-2 border-black border-opacity-75 whitespace-pre text-7xl overflow-hidden tracking-wider mt-10 mb-5 max-w-[363px]"
			>
				ToDo List.
			</h1>
			<Create onAdd={handleAdd} />
			<div className="mt-8 w-full max-w-4xl">
				{Todo.length === 0 ? (
					<div>
						<h2 className="text-3xl text-center">No Records</h2>
					</div>
				) : (
					Todo.map((item, index) => (
						<div
							className="flex items-center bg-zinc-800 rounded-full px-6 py-3 mb-5 w-full max-w-4xl"
							key={index}
						>
							<div className="flex flex-1 overflow-hidden mr-4">
								<img
									className="w-7 mr-4"
									src={item.isCompleted ? check : uncheck}
									alt="check icon"
									onClick={() => handleEdit(item._id, item.isCompleted)}
								/>
								<p
									className={`break-words ${
										item.isCompleted ? "line-through" : ""
									} `}
									onClick={() => handleEdit(item._id, item.isCompleted)}
								>
									{item.task}
								</p>
							</div>
							<div
								onClick={() => handleDelete(item._id)}
								className="flex-shrink-0"
							>
								<img src={delete_icon} alt="delete icon" />
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Home;

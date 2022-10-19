import React, { useState, useEffect } from "react";

import Task from "./task";
import Nav from "./navbar";
import { API } from "../backend";

import "../css/todo.css";

function Todo({ socket }) {
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);

	const [showTask, setShowTask] = useState(false);
	const [selectedItemID, setSelectedItemID] = useState("");

	const toggleTask = (itemId) => {
		socket.emit("viewComments", itemId);
		setSelectedItemID(itemId);
		setShowTask(!showTask);
	};

	const generateID = () => Math.random().toString(36).substring(2, 10);

	const handleAddTodo = (e) => {
		e.preventDefault();
		socket.emit("addTodo", {
			id: generateID(),
			todo,
			comments: [],
		});
		setTodo("");
	};

	useEffect(() => {
		function fetchTodos() {
			fetch(`${API}/api`)
				.then((res) => res.json())
				.then((data) => setTodoList(data))
				.catch((err) => console.error(err));
		}
		fetchTodos();
		socket.on("todos", (data) => setTodoList(data));
	}, [socket]);

	const deleteTodo = (id) => socket.emit("deleteTodo", id);

	return (
		<div>
			<Nav />
			<form className="form" onSubmit={handleAddTodo}>
				<input
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
					className="input"
					required
				/>
				<button className="form__cta">ADD TODO</button>
			</form>

			<div className="todo__container">
				{todoList.map((item) => (
					<div className="todo__item" key={item.id}>
						<p>{item.todo}</p>
						<div>
							<button
								className="commentsBtn"
								onClick={() => toggleTask(item.id)}
							>
								View Comments
							</button>

							<button className="deleteBtn" onClick={() => deleteTodo(item.id)}>
								DELETE
							</button>
						</div>
					</div>
				))}
			</div>

			{showTask ? (
				<Task
					showTask={showTask}
					setShowTask={setShowTask}
					selectedItemID={selectedItemID}
					socket={socket}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Todo;

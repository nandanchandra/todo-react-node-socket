import React, { useEffect, useRef, useState } from "react";

import "../css/task.css";

const Task = ({ showTask, setShowTask, selectedItemID, socket }) => {
	const TaskRef = useRef();
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);

	const closeTask = (e) => {
		if (TaskRef.current === e.target) {
			setShowTask(!showTask);
		}
	};
	const addComment = (e) => {
		e.preventDefault();
		socket.emit("updateComment", {
			todoID: selectedItemID,
			comment,
			user: localStorage.getItem("_username"),
		});
		setComment("");
	};
	useEffect(() => {
		socket.on("commentsReceived", (todo) => setComments(todo.comments));
	}, [socket]);

	return (
		<div className="Task" onClick={closeTask} ref={TaskRef}>
			<div className="Task__container">
				<h3>Comments</h3>
				<form className="comment__form" onSubmit={addComment}>
					<input
						className="comment__input"
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
					/>
					<button>Add Comment</button>
				</form>
				<div className="comments__container">
					{comments.length > 0 ? (
						comments.map((item, index) => (
							<div className="comment" key={index}>
								<p>
									<strong>{item.name} - </strong> {item.text}
								</p>
							</div>
						))
					) : (
						<p>No comments</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Task;

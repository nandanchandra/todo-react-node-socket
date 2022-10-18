import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signin.css";

const Signin = () => {
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem("_username", username);
		navigate("/todo");
	};
	return (
		<div className="signin">
			<h2>Sign into your todo-list</h2>
			<form onSubmit={handleSubmit} className="signin__form">
				<label htmlFor="username">Your Username</label>
				<input
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
					className="input"
				/>
				<button>SIGN IN</button>
			</form>
		</div>
	);
};

export default Signin;

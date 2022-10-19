import { Routes, Route } from "react-router-dom";

import Signin from "../Components/signin";
import Todo from "../Components/todo";

import socketIO from "socket.io-client";

export default function Routesx() {
	const socket = socketIO.connect("https://node-todo-cnc.herokuapp.com");

	return (
		<Routes>
			<Route path="/" element={<Signin />} />
			<Route path="/todo" element={<Todo socket={socket} />} />
		</Routes>
	);
}

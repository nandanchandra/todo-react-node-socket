import { Routes, Route } from "react-router-dom";

import Signin from "../Components/signin";

export default function Routesx() {
	return (
		<Routes>
			<Route path="/" element={<Signin />} />
		</Routes>
	);
}

import { useEffect } from "react";
import { useAuth } from "../store/auth";

const Home = () => {
	const { user, token } = useAuth();
	return (
		<>
			<h2>Welcome, {token ? user.username : "Guest"}</h2>
		</>
	);
};

export default Home;

import { useEffect } from "react";
import { useAuth } from "../store/auth";

const Home = ({ setProgress }) => {
	useEffect(() => {
		setTimeout(() => {
			setProgress(0);
			setProgress(100);
			setProgress(0);
		}),
			10;
	}, []);

	const { user, token } = useAuth();
	return (
		<>
			<h2>Welcome, {token ? user.username : "Guest"}</h2>
		</>
	);
};

export default Home;

import { useAuth } from "../store/auth";

const Home = () => {
	const { user } = useAuth();
	return (
		<>
			<h2>Welcome, {user.username || "Guest"}</h2>
		</>
	);
};

export default Home;

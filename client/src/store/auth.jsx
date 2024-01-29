import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState({});

	//for loading screen
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const API = import.meta.env.VITE_APP_URI_API;

	const storeToken = (serverToken) => {
		setToken(serverToken);
		return localStorage.setItem("token", serverToken);
	};

	//tackling logout functionality
	const LogoutUser = () => {
		setToken("");
		localStorage.removeItem("token");
		// window.location.href = "/login";
	};

	let isLoggedIn = !!(token === localStorage.getItem("token"));
	// console.log(user);
	console.log("Login Status: " + isLoggedIn);

	// JWT authentication - to get the data of logged in user
	const userAuthentication = async () => {
		try {
			const response = await fetch(`${API}/api/auth/user`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log( response );
			if (response.ok) {
				const data = await response.json();
				// console.log( data );
				setUser(data.userData);
			} else {
				// logging out for any unauthorized or error response
				LogoutUser();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!token) {
			// Token is not present, log out immediately
			LogoutUser();
		} else {
			// Token is present, perform authentication
			userAuthentication();
		}
	}, [token]);

	useEffect(() => {
		const fetchData = () => {
			// Simulate a delay of 2 seconds to simulate loading
			setTimeout(() => {
				// Simulated data
				const mockData = [
					{ id: 1, name: "Item 1" },
					{ id: 2, name: "Item 2" },
					{ id: 3, name: "Item 3" },
				];

				// Update the state with the simulated data
				setData(mockData);
				// Set loading to false when the data fetch is complete
				setLoading(false);
			}, 500); // 2000 milliseconds (2 seconds) delay
		};

		fetchData();
	});

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, storeToken, LogoutUser, user, token, API, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const authContextValue = useContext(AuthContext);
	if (!authContextValue) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return authContextValue;
};

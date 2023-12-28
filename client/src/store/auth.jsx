import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState({});

	const storeToken = (serverToken) => {
		setToken(serverToken);
		return localStorage.setItem("token", serverToken);
	};

	let isLoggedIn = !!token;
	console.log("Login Status: " + isLoggedIn);
	//tackling logout functionality
	const LogoutUser = () => {
		setToken("");
		return localStorage.removeItem("token");
	};

	// JWT authentication - to get the data of logged in user

	const userAuthentication = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/api/auth/user", {
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
			}

			// logging out the unsuspicious or banned user or user who is deleted after login who has tokens
			else if (response.ok === false || response.status === 401) {
				localStorage.removeItem("token");
				toast.error("Token expired, please login again");
				window.location.href = "/login";
			}
		} catch (error) {
			console.log(error);
			// Check for authentication-related error status
			if (error.response && error.response.status === 401) {
				// Clear the token and perform client-side logout
				localStorage.removeItem("token");
				// Redirect to the login page or show a message indicating logout
				window.location.href = "/login"; // Redirect to the login page
			} else {
				// Handle other types of errors
				console.error("Error:", error.message);
			}
		}
	};

	useEffect(() => {
		if (token) userAuthentication();
		if (!user) LogoutUser();
	}, [token, LogoutUser]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, storeToken, LogoutUser, user }}>
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

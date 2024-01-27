import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState({});

	const navigate = useNavigate(); // Initialize useHistory

	const storeToken = (serverToken) => {
		setToken(serverToken);
		return localStorage.setItem("token", serverToken);
	};

	//tackling logout functionality
	const LogoutUser = () => {
		setToken("");
		localStorage.removeItem("token");
		navigate("/login"); // Navigate to the login page
	};

	let isLoggedIn = !!(token === localStorage.getItem("token"));
	console.log(user);
	console.log("Login Status: " + isLoggedIn);

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

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, storeToken, LogoutUser, user, token }}
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

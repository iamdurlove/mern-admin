import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";

const URL = "http://127.0.0.1:5000/api/auth/login";

const Login = () => {
	useEffect(() => {
		if (isLoggedIn)
			navigate("/");
	})

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const { storeToken, isLoggedIn } = useAuth();

	//handling the input values
	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setUser({ ...user, [name]: value });
	};
	//handling the form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (response.ok) {
				const res_data = await response.json();
				console.log(res_data)
				storeToken(res_data.token);
				setUser({
					email: "",
					password: "",
				});
				alert("Login Success ");
				navigate({
					pathname: '/',
				});
			}
			else {
				alert("Invalid username or password");
			}

			console.log(response);
		} catch (error) {
			console.log("login", error);
		}


	};
	return (
		<>
			<section>
				<main>
					<div className="section-login">
						<div className="container grid grid-two-cols">
							<div className="login-image">
								<img
									src="/images/login.png"
									alt="login image"
									width={"400"}
									height={"400"}
								/>
							</div>
							<div className="login-form">
								<h1 className="main-heading mb-3">Login Here</h1> <br />
								<form onSubmit={handleSubmit}>
									<div className="form-inputs">
										<label htmlFor="email">email</label>
										<input
											type="text"
											name="email"
											placeholder="email"
											id="email"
											required
											autoComplete="off"
											value={user.email}
											onChange={handleInput}
										/>
									</div>

									<div className="form-inputs">
										<label htmlFor="password">password</label>
										<input
											type="password"
											name="password"
											placeholder="password"
											id="password"
											required
											autoComplete="off"
											value={user.password}
											onChange={handleInput}
										/>
									</div>
									<br />
									<button type="submit" className="btn btn-submit">
										Login
									</button>
								</form>
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};
export default Login;

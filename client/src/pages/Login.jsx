import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const Login = () => {
	useEffect(() => {
		if (isLoggedIn) navigate("/");
	});

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const { storeToken, isLoggedIn, API } = useAuth();

	const URL = `${API}/api/auth/login`;
	//handling the input values
	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setUser({ ...user, [name]: value });
	};
	//handling the form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const res_data = await response.json();
			if (response.ok) {
				console.log(res_data);
				storeToken(res_data.token);
				setUser({
					email: "",
					password: "",
				});
				toast.success("Login Successful ");
				navigate({
					pathname: "/",
				});
			} else {
				setLoading(false);
				toast.error(res_data.extraDetails || res_data.message);
			}

			console.log(response);
		} catch (error) {
			console.log("login", error);
		}
	};
	return loading ? (
		<Loading />
	) : (
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
										<label htmlFor="email">Email</label>
										<input
											type="email"
											name="email"
											placeholder="enter your email address"
											id="email"
											required
											autoComplete="off"
											value={user.email}
											onChange={handleInput}
										/>
									</div>

									<div className="form-inputs">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											name="password"
											placeholder="enter your password"
											id="password"
											required
											autoComplete="off"
											value={user.password}
											onChange={handleInput}
										/>
									</div>
									<div className="d-flex w-100 justify-content-space-between">
										<button
											type="submit"
											className="btn btn-submit btn-primary"
										>
											Login
										</button>
										<NavLink to="/register">
											<button className="ms-2 btn btn-success">
												Register Now
											</button>{" "}
										</NavLink>
									</div>
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

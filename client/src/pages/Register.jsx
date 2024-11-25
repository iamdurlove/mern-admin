import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
	// console.log(import.meta.env.VITE_APP_RECAPTCHA_KEY);
	const { isLoggedIn, API } = useAuth();
	const [loading, setLoading] = useState(false);
	const [verified, setVerified] = useState(false);

	const URL = `${API}/api/auth/register`;
	useEffect(() => {
		if (isLoggedIn) navigate("/");
	});

	const [user, setUser] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});

	const navigate = useNavigate();

	const { storeToken } = useAuth();

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

		if (!verified) {
			toast.error("Complete recaptcha verfication to continue");
			setLoading(false);
		} else {
			// console.log( user );
			try {
				setLoading(true);
				const response = await fetch(URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				});
				const res_data = await response.json();
				console.log("res from server", res_data);

				if (response.ok) {
					//storing token in local storage
					storeToken(res_data.token);
					setUser({
						username: "",
						email: "",
						phone: "",
						password: "",
					});
					toast.success("Successfully Registered, Check Email To Verify");
					navigate("/login");
				} else {
					setLoading(false);
					toast.error(res_data.extraDetails || res_data.message);
				}

				// console.log( response );
			} catch (error) {
				console.log("register", error);
			}
		}
	};
	function onChange(value) {
		setVerified(true);
	}
	return loading ? (
		<Loading />
	) : (
		<>
			<section>
				<main className="main">
					<div className="section-registration">
						<div className="container grid grid-two-cols">
							<div className="registration-image">
								<img
									src="/images/login.png"
									alt="register image"
									width={"400"}
									height={"400"}
								/>
							</div>
							<div className="registration-form">
								<h1 className="main-heading mb-3">Registration Form</h1>
								<form onSubmit={handleSubmit}>
									<div className="form-inputs">
										<label htmlFor="username">Username</label>
										<input
											type="text"
											name="username"
											placeholder="Enter Your Username"
											id="username"
											required
											autoComplete="off"
											value={user.username}
											onChange={handleInput}
										/>
									</div>
									<div className="form-inputs">
										<label htmlFor="email">Email</label>
										<input
											type="email"
											name="email"
											placeholder="Enter Your Email"
											id="email"
											required
											autoComplete="off"
											value={user.email}
											onChange={handleInput}
										/>
									</div>
									<div className="form-inputs">
										<label htmlFor="phone">Phone</label>
										<input
											type="number"
											name="phone"
											placeholder="Enter Your Phone"
											id="phone"
											required
											autoComplete="off"
											value={user.phone}
											onChange={handleInput}
										/>
									</div>
									<div className="form-inputs">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											name="password"
											placeholder="Enter Your Password"
											id="password"
											required
											autoComplete="off"
											value={user.password}
											onChange={handleInput}
										/>
									</div>

									<ReCAPTCHA
										sitekey={`${import.meta.env.VITE_APP_RECAPTCHA_KEY}`}
										onChange={onChange}
									/>
									<br />
									<button type="submit" className="btn btn-submit btn-primary">
										Register Now
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

export default Register;

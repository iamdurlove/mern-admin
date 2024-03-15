import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Reset = () => {
	const { storeToken, isLoggedIn, API } = useAuth();
	const [formData, setFormData] = useState({});

	const navigate = useNavigate();
	const params = new URLSearchParams(document.location.search);
	const URL = `${API}/api/auth/reset`;

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.cpassword) {
			toast.error("Confirm Password Should Match Password");
			console.log(formData.password);
		} else {
			try {
				const response = await fetch(URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userId: params.get("id"),
						resetString: params.get("token"),
						newPassword: formData.password,
					}),
				});

				const res_data = await response.json();
				console.log(res_data);
				if (response.ok) {
					console.log(res_data);
					setFormData({
						password: "",
						cpassword: "",
					});
					toast.success("Password Reset Successful ");
					navigate({
						pathname: "/login",
					});
				} else {
					toast.error(res_data.extraDetails || res_data.message);
				}

				console.log(response);
			} catch (error) {
				console.log("login", error);
			}
		}
	};
	return (
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
							<h1 className="main-heading mb-3">Reset Password</h1> <br />
							<form onSubmit={handleSubmit}>
								<div className="form-inputs">
									<label htmlFor="password">New Password</label>
									<input
										type="password"
										name="password"
										placeholder="enter your password address"
										id="password"
										required
										autoComplete="off"
										value={formData.password}
										onChange={handleInput}
									/>
								</div>

								<div className="form-inputs">
									<label htmlFor="password">Confirm Password</label>
									<input
										type="password"
										name="cpassword"
										placeholder="enter your password"
										id="cpassword"
										required
										autoComplete="off"
										value={formData.cpassword}
										onChange={handleInput}
									/>
								</div>
								<div className="d-flex w-100 justify-content-space-between">
									<button type="submit" className="btn btn-submit btn-primary">
										Change Password
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
};

export default Reset;

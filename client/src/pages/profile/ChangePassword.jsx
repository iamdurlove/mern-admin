import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
	// State to manage form inputs
	const [formData, setFormData] = useState({});

	// Function to handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const URL = "http://127.0.0.1:5000/api/auth/change-password";
		const token = localStorage.getItem("token");

		if (formData.password !== formData.confirmPassword) {
			toast.error("password do not match");
			return;
		} else if (
			formData.password.length < 5 ||
			formData.confirmPassword.length < 5
		) {
			toast.error("password must be at least 6 characters");
			return;
		}
		try {
			const response = await fetch(URL, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			const res_data = await response.json();
			console.log(res_data);
			setFormData(res_data);
			console.log(res_data);

			if (response.ok) {
				toast.success(res_data.extraDetails || res_data.message);
				setFormData({
					password: "",
					confirmPassword: "",
				});
			} else toast.error("Internal Server Error, Please Try Again");
		} catch (error) {
			toast.error("Internal Server Error, Please Try Again");
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Change Password</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="password">New Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>{" "}
				<br />
				<button type="submit">Change Password</button>
			</form>
		</div>
	);
};

export default ChangePassword;

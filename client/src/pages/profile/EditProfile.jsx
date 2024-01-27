import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const navigate = useNavigate();

	// State to manage form inputs
	const [formData, setFormData] = useState({});
	const [userData, setUserData] = useState(true);
	const { user, API } = useAuth();

	if (userData && user) {
		setFormData({
			username: user.username,
			email: user.email,
			phone: user.phone,
		});
		setUserData(false);
	}

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
		const URL = `${API}/api/auth/edit-profile`;
		const token = localStorage.getItem("token");

		if (formData.newPassword !== formData.confirmPassword) {
			toast.error("password do not match");
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

			if (response.ok) {
				toast.success(res_data.extraDetails || res_data.message);
				navigate("/profile");
			} else toast.error(res_data.extraDetails || res_data.message);
		} catch (error) {
			toast.error("Internal Server Error, Please Try Again");
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Edit Profile Details</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="phone">Phone Number:</label>
					<input
						type="number"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						required
					/>
				</div>
				<br />
				<button type="submit">Update Details</button>
			</form>
		</div>
	);
};

export default EditProfile;

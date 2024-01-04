import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

const AdminEditUser = () => {
	const [user, setUser] = useState([
		{
			username: "",
			email: "",
			phone: "",
			isAdmin: false,
		},
	]);
	const [userData, setUserData] = useState(true);

	const navigate = useNavigate();
	const params = useParams();
	const fetchUser = async () => {
		const URL = `http://127.0.0.1:5000/api/admin/user/${params.id}`;
		try {
			const response = await fetch(URL, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const res_data = await response.json();
			// console.log(res_data);

			if (response.ok) {
				if (userData) {
					setUser({
						username: res_data.username,
						email: res_data.email,
						phone: res_data.phone,
						isAdmin: res_data.isAdmin,
					});
					setUserData(false);
				}
			}
		} catch (error) {
			toast.error("Error Loading Data");
		}
	};
	useEffect(() => {
		fetchUser();
	}, []);

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === "isAdmin") {
			value = value === "true"; // Assuming the dropdown values are strings 'true' and 'false'
		}
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const URL = `http://127.0.0.1:5000/api/admin/users/${params.id}`;
		try {
			const response = await fetch(URL, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(user),
			});

			const res_data = await response.json();
			console.log("put data: ", res_data);
			console.log(JSON.stringify(user));
			if (response.ok) {
				console.log("res from server", res_data);
				toast.success("User Updated successfully");
				navigate("/admin/users");
			} else {
				toast.error(res_data.extraDetails || res_data.message);
			}
		} catch (error) {
			toast.error(res_data.extraDetails || res_data.message);
			console.log("edit error: ", error);
		}
	};

	return (
		<div
			style={{
				width: "60%",
				textAlign: "left",
				margin: "auto",
			}}
			className="update-form"
		>
			<h1 className="main-heading mb-3">Edit User</h1>
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
					<label htmlFor="isAdmin">Admin Role</label>
					<select
						name="isAdmin"
						value={user.isAdmin}
						onChange={handleInput}
						className="bg-dark text-light"
					>
						<option value={true} selected={user.isAdmin === true}>
							Yes
						</option>
						<option value={false} selected={user.isAdmin === false}>
							No
						</option>
					</select>
				</div>
				<br />
				<button type="submit" className="btn btn-submit btn-outline-primary">
					Update
				</button>
			</form>
		</div>
	);
};

export default AdminEditUser;

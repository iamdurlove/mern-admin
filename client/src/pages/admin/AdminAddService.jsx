import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import Loading from "../../utils/Loading";

const AdminAddService = () => {
	const { token, API } = useAuth();
	const [loading, setLoading] = useState(false);
	const [service, setService] = useState({
		description: "",
		service: "",
		provider: "",
		price: "",
	});

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setService({ ...service, [name]: value });
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const URL = `${API}/api/admin/add-service`;
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(service),
			});

			const res_data = await response.json();

			if (response.ok) {
				// console.log("res from server", res_data);
				toast.success("Service Added successfully");
				navigate("/admin/services");
			} else {
				setLoading(false);
				toast.error(res_data.extraDetails || res_data.message);
			}
		} catch (error) {
			console.log("service add error: ", error);
		}
	};
	return loading ? (
		<Loading />
	) : (
		<div
			style={{
				width: "60%",
				textAlign: "left",
				margin: "auto",
			}}
			className="update-form"
		>
			<h1 className="main-heading mb-3">Add Service</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-inputs">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						name="description"
						placeholder="Service description"
						id="description"
						required
						autoComplete="off"
						value={service.description}
						onChange={handleInput}
					/>
				</div>
				<div className="form-inputs">
					<label htmlFor="service">Service Name</label>
					<input
						type="text"
						name="service"
						placeholder="Service name"
						id="service"
						required
						autoComplete="off"
						value={service.service}
						onChange={handleInput}
					/>
				</div>
				<div className="form-inputs">
					<label htmlFor="provider">Provider</label>
					<input
						type="text"
						name="provider"
						placeholder="Your provider"
						id="provider"
						required
						autoComplete="off"
						value={service.provider}
						onChange={handleInput}
					/>
				</div>

				<div className="form-inputs">
					<label htmlFor="price">Price</label>
					<input
						type="number"
						name="price"
						placeholder="service price"
						id="price"
						required
						autoComplete="off"
						value={service.price}
						onChange={handleInput}
					/>
				</div>

				<br />
				<button type="submit" className="btn btn-submit btn-primary">
					Add Service
				</button>
			</form>
		</div>
	);
};

export default AdminAddService;

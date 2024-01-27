import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminEditService = () => {
	const { token, API } = useAuth();
	const [service, setService] = useState({
		description: "",
		service: "",
		provider: "",
		price: "",
	});
	const [serviceData, setServiceData] = useState(true);

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setService({ ...service, [name]: value });
	};

	const navigate = useNavigate();
	const params = useParams();

	const fetchServices = async () => {
		try {
			const URL = `${API}/api/admin/service/${params.id}`;
			const response = await fetch(URL, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const res_data = await response.json();
			console.log(response);
			console.log(res_data);
			if (response.ok) {
				if (serviceData)
					setService({
						description: res_data.description,
						service: res_data.service,
						provider: res_data.provider,
						price: res_data.price,
					});
				setServiceData(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const URL = `${API}/api/admin/services/${params.id}`;
		try {
			const response = await fetch(URL, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(service),
			});

			const res_data = await response.json();

			if (response.ok) {
				// console.log("res from server", res_data);
				toast.success("Service Updated successfully");
				navigate("/admin/services");
			} else {
				toast.error(res_data.extraDetails || res_data.message);
			}
		} catch (error) {
			console.log("service add error: ", error);
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
			<h1 className="main-heading mb-3">Edit Service</h1>
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
				<button type="submit" className="btn btn-submit btn-outline-primary">
					Update Service
				</button>
			</form>
		</div>
	);
};

export default AdminEditService;

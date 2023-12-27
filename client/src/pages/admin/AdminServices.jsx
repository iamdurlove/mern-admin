import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";

const URL = "http://127.0.0.1:5000/api/admin/services";
const token = localStorage.getItem("token");

const AdminServices = () => {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(URL, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const services = await response.json();
				setData(services);
				// console.log( services );
				// if (services) console.log("Data Fetched Successfully");
				if (!services) toast.error("Server Error");
			} catch (error) {
				toast.error("Error Loading Data");
			}
		};

		fetchUsers();
	});

	const handleDelete = async (userId, serviceName) => {
		const confirmDelete = window.confirm(
			`Delete the service for ${serviceName}`
		);
		if (confirmDelete) {
			try {
				const response = await fetch(`${URL}/${userId}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.ok) {
					navigate("/admin/services");
					toast.success("Service Deleted Successfully");
				} else {
					toast.error("Error Deleting Service");
				}
			} catch (error) {
				toast.error("Error deleting service");
				console.log(error);
			}
		}
	};

	return (
		<div className="user-container">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>SN</th>
						<th>Service</th>
						<th>Description</th>
						<th>Provider</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 ? (
						data.map((item, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{data[i].service}</td>
								<td>{data[i].description}</td>
								<td>{data[i].provider}</td>
								<td>{data[i].price}</td>
								<td>
									<Button
										variant="danger"
										onClick={() => handleDelete(data[i]._id, data[i].service)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="100%">
								<h1>No services found.</h1>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default AdminServices;

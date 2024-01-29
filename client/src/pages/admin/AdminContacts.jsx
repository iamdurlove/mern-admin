import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import { useAuth } from "../../store/auth";
import Loading from "../../utils/Loading";

const AdminContacts = () => {
	const { token, API } = useAuth();
	const URL = `${API}/api/admin/contacts`;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchContacts = async () => {
		try {
			const response = await fetch(URL, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log(response);
			const contacts = await response.json();
			setData(contacts);
			setLoading(false);

			if (contacts) console.log("Data Fetched Successfully");
			if (!contacts) toast.error("Data Fetch Failure");
		} catch (error) {
			toast.error("Error Loading Data");
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	const handleDelete = async (userId, userName) => {
		const confirmDelete = window.confirm(`Delete the contact for ${userName}`);
		if (confirmDelete) {
			try {
				const response = await fetch(`${URL}/${userId}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response);
				if (response.ok) {
					// Remove the deleted user from the state
					fetchContacts();
					toast.success("User Deleted Successfully");
				} else {
					toast.error("Error Deleting Contact");
				}
			} catch (error) {
				toast.error("Error deleting contact");
				console.log(error);
			}
		}
	};

	return loading ? (
		<Loading />
	) : (
		<div className="user-container">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 ? (
						data.map((item, i) => (
							<tr key={i}>
								<td>{data[i].name}</td>
								<td>{data[i].email}</td>
								<td>{data[i].message}</td>
								<td>
									<Button
										variant="danger"
										onClick={() => handleDelete(data[i]._id, data[i].name)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="5">
								<h1>No contacts found.</h1>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default AdminContacts;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import { useAuth } from "../../store/auth";
import Loading from "../../utils/Loading";

const AdminUsers = () => {
	const { token, API } = useAuth();
	const URL = `${API}/api/admin/users`;
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchUsers = async () => {
		try {
			const response = await fetch(URL, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const users = await response.json();
			setData(users);
			setLoading(false);
			console.log(users);
			if (response.ok) console.log("Data Fetched Successfully");
		} catch (error) {
			toast.error("Error Loading Data");
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	const handleDelete = async (userId, userName) => {
		const confirmDelete = window.confirm(`Delete the user for ${userName}`);
		if (confirmDelete) {
			try {
				const response = await fetch(`${URL}/${userId}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				// console.log(response);
				if (response.ok) {
					fetchUsers();
					toast.success("User Deleted Successfully");
				} else {
					toast.error("Error Deleting User");
				}
			} catch (error) {
				console.error("Error Deleting User", error);
				toast.error("Error Deleting User");
			}
		}
	};

	const handleEdit = (user) => {
		navigate(`/admin/user/${user}/edit`);
	};
	return loading ? (
		<Loading />
	) : (
		<>
			<div className="user-container">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Phone</th>
							<th>isAdmin</th>
							<th>isVerified</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 ? (
							data.map((item, i) => (
								<tr key={i}>
									<td>{data[i].username}</td>
									<td>{data[i].email}</td>
									<td>{data[i].phone}</td>
									<td>{data[i].isAdmin ? "Yes" : "No"}</td>
									<td>{data[i].isVerified ? "Yes" : "No"}</td>
									<td>
										<Button
											variant="primary btn-sm"
											onClick={() => handleEdit(data[i]._id)}
										>
											Edit
										</Button>
										<Button
											variant="danger btn-sm"
											onClick={() =>
												handleDelete(data[i]._id, data[i].username)
											}
										>
											Delete
										</Button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5">
									<h1>No users found.</h1>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		</>
	);
};

export default AdminUsers;

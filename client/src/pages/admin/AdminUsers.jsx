import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import UserForm from "../../components/UserForm";

const URL = "http://127.0.0.1:5000/api/admin/users";
const token = localStorage.getItem("token");

const AdminUsers = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	useEffect(() => {
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
				// console.log( users );
				if (response.ok) console.log("Data Fetched Successfully");
			} catch (error) {
				toast.error("Error Loading Data");
			}
		};
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
					navigate("/admin/users");
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
		setSelectedUser(user);
		setShowEditForm(true);
	};

	const handleUpdate = async (updatedData) => {
		try {
			const response = await fetch(`${URL}/${updatedData._id}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedData),
			});
			const res_data = await response.json();
			// console.log(res_data);
			if (response.ok) {
				// Update the local state with the updated data
				setData((prevData) =>
					prevData.map((user) =>
						user._id === updatedData._id ? updatedData : user
					)
				);
				toast.success("User Updated Successfully");
			} else {
				toast.error(res_data.extraDetails || res_data.message);
			}
		} catch (error) {
			console.error("Error Updating User", error);
			toast.error("Error Updating User");
		}
	};

	const handleCloseEditForm = () => {
		setShowEditForm(false);
	};

	return (
		<>
			<div className="user-container">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Phone</th>
							<th>isAdmin</th>
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

			<UserForm
				show={showEditForm}
				handleClose={handleCloseEditForm}
				userData={selectedUser}
				handleUpdate={handleUpdate}
			/>
		</>
	);
};

export default AdminUsers;

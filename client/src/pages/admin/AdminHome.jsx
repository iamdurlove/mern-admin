import { useAuth } from "../../store/auth";
import { useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdPaid } from "react-icons/md";
import "./css/admin.css";

const AdminHome = () => {
	const { user, isLoggedIn } = useAuth();
	const navigate = useNavigate();
	// console.log( user.isAdmin );
	useEffect(() => {
		if (!isLoggedIn || !user.isAdmin) navigate("/");
	}, []);
	return (
		<>
			<div className="admin-container">
				<div className="menu-container">
					<ul>
						<li>
							<NavLink to="/admin/users">
								{" "}
								<FaUser /> Users
							</NavLink>
						</li>
						<li>
							<NavLink to="/admin/contacts">
								<FaMessage /> Contact
							</NavLink>
						</li>
						<li>
							<NavLink to="/admin/services">
								<FaRegListAlt /> Services
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="content-div">
					<div className="action-container">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminHome;

import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaUserEdit } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { RiLogoutCircleRFill } from "react-icons/ri";

const Profile = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();
	useEffect(() => {
		if (!isLoggedIn) navigate("/");
	}, []);

	return (
		<div className="admin-container">
			<div className="menu-container">
				<ul>
					<li>
						<NavLink to="/profile/edit-profile">
							<FaUserEdit /> Edit Profile
						</NavLink>
					</li>
					<li>
						<NavLink to="/profile/change-password">
							<TbPasswordUser /> Change Password
						</NavLink>
					</li>
					<li>
						<NavLink to="/logout">
							<RiLogoutCircleRFill /> Logout
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="profile-content-div">
				<div className="profile-action-container">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Profile;

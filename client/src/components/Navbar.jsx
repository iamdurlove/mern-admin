import { NavLink } from "react-router-dom";
import "../components/css/Navbar.css";
import { useAuth } from "../store/auth";
import { MdHome, MdDashboard } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
	const { isLoggedIn, user } = useAuth();

	//getting first name of user
	if (user.username) {
		var fullUserName = user.username;
		let trimmedText = fullUserName.trim();
		let words = trimmedText.split(" ");
		var userFirstName = words[0];
	}

	return (
		<>
			<header>
				<div className="container">
					<div className="logo-brand">
						<NavLink to="/">Portfolio</NavLink>
					</div>
					<nav>
						<ul>
							<li>
								<NavLink to="/">
									<MdHome /> Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/about">
									<IoInformationCircle /> About
								</NavLink>
							</li>
							<li>
								<NavLink to="/service">
									<GrServices /> Services
								</NavLink>
							</li>
							<li>
								<NavLink to="/contact">
									<IoMdMail /> Contact
								</NavLink>
							</li>

							{isLoggedIn && user.isAdmin ? (
								<li>
									<NavLink to="/admin">
										{" "}
										<MdDashboard /> Dashboard
									</NavLink>
								</li>
							) : null}

							{isLoggedIn ? null : (
								<>
									<li>
										<NavLink to="/login">
											{" "}
											<RiLoginCircleFill /> Login
										</NavLink>
									</li>
									{/* <li>
                                        <NavLink to="/register"><IoMdPersonAdd />  Register</NavLink>
                                    </li> */}
								</>
							)}
						</ul>
					</nav>
					{isLoggedIn ? (
						<div className="user-panel">
							<li className="username">
								<NavLink to="/profile">
									<FaUser /> {userFirstName}
								</NavLink>
							</li>
						</div>
					) : null}
				</div>
			</header>
		</>
	);
};

export default Navbar;

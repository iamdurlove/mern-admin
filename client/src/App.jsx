import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import AdminHome from "./pages/admin/AdminHome";
import AdminServices from "./pages/admin/AdminServices";
import AdminAddService from "./pages/admin/AdminAddService";
import AdminEditService from "./pages/admin/AdminEditService";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContacts from "./pages/admin/AdminContacts";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import EditProfile from "./pages/profile/EditProfile";
import ProfileDetails from "./pages/profile/ProfileDetails";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./store/auth.jsx";

const App = () => {
	const [progress, setProgress] = useState(0);
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<LoadingBar
						color="#f11946"
						progress={progress}
						onLoaderFinished={() => setProgress(0)}
					/>
					<Navbar />
					<Routes>
						<Route
							path="/"
							title="home"
							element={<Home setProgress={setProgress} />}
						/>
						<Route
							path="/about"
							element={<About setProgress={setProgress} />}
						/>
						<Route
							path="/contact"
							element={<Contact setProgress={setProgress} />}
						/>
						<Route
							path="/service"
							element={<Service setProgress={setProgress} />}
						/>
						<Route
							path="/register"
							element={<Register setProgress={setProgress} />}
						/>
						<Route
							path="/login"
							element={<Login setProgress={setProgress} />}
						/>
						<Route
							path="/logout"
							element={<Logout setProgress={setProgress} />}
						/>
						<Route
							path="/profile/*"
							element={<Profile setProgress={setProgress} />}
						>
							<Route
								path="change-password"
								element={<ChangePassword setProgress={setProgress} />}
							/>
							<Route
								path="edit-profile"
								element={<EditProfile setProgress={setProgress} />}
							/>
							<Route
								path=""
								element={<ProfileDetails setProgress={setProgress} />}
							/>
						</Route>
						<Route
							path="/admin/*"
							element={<AdminHome setProgress={setProgress} />}
						>
							<Route
								path="users"
								element={<AdminUsers setProgress={setProgress} />}
							/>
							<Route
								path="contacts"
								element={<AdminContacts setProgress={setProgress} />}
							/>
							<Route
								path="services"
								element={<AdminServices setProgress={setProgress} />}
							/>
							<Route
								path="services/add"
								element={<AdminAddService setProgress={setProgress} />}
							/>
							<Route
								path="service/:id/edit"
								element={<AdminEditService setProgress={setProgress} />}
							/>
							<Route
								path="user/:id/edit"
								element={<AdminEditUser setProgress={setProgress} />}
							/>
						</Route>
						<Route path="*" element={<Error setProgress={setProgress} />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
};

export default App;

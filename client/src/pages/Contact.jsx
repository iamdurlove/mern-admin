import { useAuth } from "../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
	const { user, API } = useAuth();
	const [contact, setContact] = useState({
		name: user.username || "",
		email: user.email || "",
		message: "",
	});
	const [userData, setUserData] = useState(true);
	// console.log(user);
	if (userData) {
		setContact({
			name: user.username,
			email: user.email,
			message: "",
		});
		setUserData(false);
	}

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setContact({ ...contact, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const URL = `${API}/api/form/contact`;

		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			});
			// console.log( "contact data: ", contact )

			if (response.ok) {
				const res_data = await response.json();
				console.log("res from server", res_data);
				setContact({
					name: user.username,
					email: user.email,
					message: "",
				});
				toast.success("Message sent successfully");
			}

			console.log(response);
		} catch (error) {
			console.log("contact form error: ", error);
		}
	};

	return (
		<div className="contact-form">
			<h1 className="main-heading mb-3">Contact Form</h1> <br />
			<form onSubmit={handleSubmit}>
				<div className="form-inputs">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="name"
						placeholder="enter your username"
						id="username"
						required
						autoComplete="off"
						value={contact.name}
						onChange={handleInput}
					/>
				</div>
				<div className="form-inputs">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						placeholder="enter your email address"
						id="email"
						required
						autoComplete="off"
						value={contact.email}
						onChange={handleInput}
					/>
				</div>
				<div className="form-inputs">
					<label htmlFor="message">Message</label>
					<textarea
						type="text"
						name="message"
						placeholder="enter your message"
						id="message"
						required
						autoComplete="off"
						value={contact.message}
						onChange={handleInput}
					/>
				</div>
				<br />
				<button type="submit" className="btn btn-submit btn-success">
					Send Message
				</button>
			</form>
		</div>
	);
};

export default Contact;

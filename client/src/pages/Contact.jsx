import { useAuth } from "../store/auth"
import { useState } from "react";

const Contact = () => {
  const [contact, setContact] = useState({});
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  // console.log(user);

  if (userData && user) {
    setContact({
      name: user.username,
      email: user.email,
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
    const URL = "http://127.0.0.1:5000/api/form/contact";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      console.log("contact data: ", contact)


      if (response.ok) {
        const res_data = await response.json();
        console.log('res from server', res_data);
        setContact({
          message: ""
        })
        alert("Message sent successfully");
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
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="name"
            placeholder="username"
            id="username"
            required
            autoComplete="off"
            value={contact.name}
            onChange={handleInput}
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            id="email"
            required
            autoComplete="off"
            value={contact.email}
            onChange={handleInput}
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="message">message</label>
          <textarea
            type="text"
            name="message"
            placeholder="message"
            id="message"
            required
            autoComplete="off"
            value={contact.message}
            onChange={handleInput}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-submit">
          Register Now
        </button>
      </form>
    </div>
  )
}

export default Contact
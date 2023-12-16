import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


const URL = "http://127.0.0.1:5000/api/auth/register";

const Register = () =>
{

	const { isLoggedIn } = useAuth();

	useEffect( () =>
	{
		if ( isLoggedIn )
			navigate( "/" );
	} )

	const [ user, setUser ] = useState( {
		username: "",
		email: "",
		phone: "",
		password: "",
	} );

	const navigate = useNavigate();

	const { storeToken } = useAuth();

	//handling the input values
	const handleInput = ( e ) =>
	{
		let name = e.target.name;
		let value = e.target.value;
		setUser( { ...user, [ name ]: value } );

	};
	//handling the form submit
	const handleSubmit = async ( e ) =>
	{
		e.preventDefault();

		// console.log( user );
		try
		{
			const response = await fetch( URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify( user ),
			} );
			const res_data = await response.json();
			console.log( 'res from server', res_data );

			if ( response.ok )
			{
				//storing token in local storage
				storeToken( res_data.token );
				setUser( {
					username: "",
					email: "",
					phone: "",
					password: "",
				} );
				toast.success( "Successfully Registered" );
				navigate( "/login" );
			} else
			{
				toast.error( res_data.extraDetails || res_data.message );
			}

			// console.log( response );
		} catch ( error )
		{
			console.log( "register", error );
		}
	};
	return (
		<>
			<section>
				<main>
					<div className="section-registration">
						<div className="container grid grid-two-cols">
							<div className="registration-image">
								<img
									src="/images/register.png"
									alt="register image"
									width={ "400" }
									height={ "400" }
								/>
							</div>
							<div className="registration-form">
								<h1 className="main-heading mb-3">Registration Form</h1> <br />
								<form onSubmit={ handleSubmit }>
									<div className="form-inputs">
										<label htmlFor="username">username</label>
										<input
											type="text"
											name="username"
											placeholder="username"
											id="username"
											required
											autoComplete="off"
											value={ user.username }
											onChange={ handleInput }
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
											value={ user.email }
											onChange={ handleInput }
										/>
									</div>
									<div className="form-inputs">
										<label htmlFor="phone">phone</label>
										<input
											type="number"
											name="phone"
											placeholder="phone"
											id="phone"
											required
											autoComplete="off"
											value={ user.phone }
											onChange={ handleInput }
										/>
									</div>
									<div className="form-inputs">
										<label htmlFor="password">password</label>
										<input
											type="password"
											name="password"
											placeholder="password"
											id="password"
											required
											autoComplete="off"
											value={ user.password }
											onChange={ handleInput }
										/>
									</div>
									<br />
									<button type="submit" className="btn btn-submit">
										Register Now
									</button>
								</form>
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};

export default Register;

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePassword = () =>
{
    // State to manage form inputs
    const [ formData, setFormData ] = useState( {} );

    // Function to handle form input changes
    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) );
    };

    // Function to handle form submission
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        const URL = "http://127.0.0.1:5000/api/auth/change-password";
        const token = localStorage.getItem( "token" );

        if ( formData.newPassword !== formData.confirmPassword )
        {
            toast.error( "password do not match" );
            return;
        }
        try
        {
            const response = await fetch( URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`
                },
                body: JSON.stringify( formData ),
            } );

            const res_data = await response.json();
            console.log( res_data );
            setFormData( res_data );

            if ( response.ok )
            {
                toast.success( res_data.extraDetails || res_data.message );
                setFormData( {
                    newPassword: '',
                    confirmPassword: '',
                } );
            }
            else
                toast.error( "Internal Server Error, Please Try Again" );

        } catch ( error )
        {
            toast.error( "Internal Server Error, Please Try Again" );
            console.error( error );
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={ formData.newPassword }
                        onChange={ handleChange }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={ formData.confirmPassword }
                        onChange={ handleChange }
                        required
                    />
                </div> <br />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;

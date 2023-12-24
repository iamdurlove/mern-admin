import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Table, Button } from 'react-bootstrap';


const URL = "http://127.0.0.1:5000/api/admin/contacts"
const token = localStorage.getItem( 'token' );


const AdminContacts = () =>
{
    const [ data, setData ] = useState( [] );
    useEffect( () =>
    {
        const fetchUsers = async () =>
        {
            try
            {
                const response = await fetch( URL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${ token }`,
                    },
                } );
                const contacts = await response.json();
                setData( contacts );
                console.log( contacts );
                if ( contacts )
                    console.log( "Data Fetched Successfully" )

            } catch ( error )
            {
                toast.error( "Error Loading Data" );
            }
        }

        fetchUsers();
    }, [] )

    const handleDelete = async ( userId, userName ) =>
    {
        const confirmDelete = window.confirm( `Delete the contact for ${ userName }` );
        if ( confirmDelete )
        {
            try
            {
                const response = await fetch( `${ URL }/${ userId }`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${ token }`,
                    },
                } );
                if ( response.ok )
                {
                    // Remove the deleted user from the state
                    setData( prevData => prevData.filter( user => user._id !== userId ) );
                    toast.success( "User Deleted Successfully" );
                } else
                {
                    toast.error( "Error Deleting User" );
                }
            } catch ( error )
            {
                toast.error( "Error deleting user" );
                console.log( error );
            }
        }

    }

    return (
        <div className="user-container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map( ( item, i ) => (
                        <tr key={ i }>
                            <td>{ data[ i ].email }</td>
                            <td>{ data[ i ].name }</td>
                            <td>{ data[ i ].message }</td>
                            <td>
                                <Button variant="danger" onClick={ () => handleDelete( data[ i ]._id, data[ i ].name ) }>Delete</Button>
                            </td>
                        </tr>
                    ) ) }
                </tbody>
            </Table>
        </div>
    )
}

export default AdminContacts
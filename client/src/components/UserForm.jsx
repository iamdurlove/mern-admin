// UserForm.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserForm = ( { show, handleClose, userData, handleUpdate } ) =>
{
    const [ updatedData, setUpdatedData ] = useState( userData );

    const handleChange = ( e ) =>
    {
        setUpdatedData( { ...updatedData, [ e.target.name ]: e.target.value } );
    };

    const handleSave = () =>
    {
        handleUpdate( updatedData );
        handleClose();
    };

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={ updatedData.username }
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={ updatedData.email }
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={ updatedData.phone }
                            onChange={ handleChange }
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>
                    Close
                </Button>
                <Button variant="primary" onClick={ handleSave }>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserForm;

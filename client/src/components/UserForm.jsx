// UserForm.js
import React, { useState, useEffect } from 'react';
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
        handleUpdate( updatedData, data );
        handleClose();
    };

    return (
        <Modal show={ show } onHide={ handleClose } dialogClassName="dark-modal">
            <Modal.Header closeButton className="bg-dark text-light">
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={ updatedData.username || '' }
                            onChange={ handleChange }
                            className="bg-dark text-light"

                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={ updatedData.email }
                            onChange={ handleChange }
                            className="bg-dark text-light"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={ updatedData.phone }
                            onChange={ handleChange }
                            className="bg-dark text-light"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
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

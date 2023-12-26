import React from 'react';
import './css/ProfileDetails.css';
import { useAuth } from '../../store/auth';


const ProfileDetails = () =>
{
    const { user } = useAuth();

    const username = user.username;
    const email = user.email;
    const phone = user.phone;

    return (
        <div className="profile-details-container">
            <h2>Profile Details</h2>
            <div className="detail">
                <strong>Username:</strong> { username }
            </div>
            <div className="detail">
                <strong>Email:</strong> { email }
            </div>
            <div className="detail">
                <strong>Phone:</strong> { phone }
            </div>
        </div>
    );
};

export default ProfileDetails;

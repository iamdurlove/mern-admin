import React, { useEffect } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import { useAuth } from '../../store/auth'
import EditProfile from './EditProfile'
import ProfileDetails from './ProfileDetails'

const Profile = () =>
{
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();
    useEffect( () =>
    {
        if ( !isLoggedIn )
            navigate( '/' );
    } );

    return (
        <div className="admin-container">
            <div className="menu-container">
                <ul>
                    <li>
                        <NavLink to="/profile/edit-profile">Edit Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/change-password">Change Password</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout">Logout</NavLink>
                    </li>
                </ul>
            </div>
            <div className="content-div">
                <div className="action-container">
                </div>
                <Routes>
                    <Route path="/change-password" element={ <ChangePassword /> } />
                    <Route path="/edit-profile" element={ <EditProfile /> } />
                    <Route path="/" element={ <ProfileDetails /> } />

                </Routes>
            </div>
        </div>
    )
}

export default Profile
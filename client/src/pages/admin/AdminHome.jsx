import { useAuth } from "../../store/auth"
import { useEffect } from "react";
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import AdminServices from "./AdminServices";
import AdminUsers from "./AdminUsers";
import AdminContacts from "./AdminContacts";



const AdminHome = () =>
{
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    // console.log( user.isAdmin );
    useEffect( () =>
    {
        if ( !user.isAdmin || !isLoggedIn )
            navigate( '/' );
    } );
    return (
        <>
            <div className="admin-container">
                <div className="menu-container">
                    <ul>
                        <li>
                            <NavLink to="/admin/users">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts">Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/services">Services</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="content-div">
                    <div className="action-container">
                        { }
                    </div>
                    <Routes>
                        <Route path="/users" element={ <AdminUsers /> } />
                        <Route path="/contacts" element={ <AdminContacts /> } />
                        <Route path="/services" element={ <AdminServices /> } />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AdminHome
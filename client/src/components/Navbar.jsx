import React from 'react';
import { NavLink } from 'react-router-dom';
import '../components/css/Navbar.css';
import { useAuth } from '../store/auth';

const Navbar = () =>
{
    const { isLoggedIn, user } = useAuth();

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Portfolio</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/service">Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>

                            { ( isLoggedIn && user.isAdmin ) ?
                                <li>
                                    <NavLink to="/admin">Dashboard</NavLink>
                                </li> : null }

                            { ( isLoggedIn ) ?
                                <li >
                                    <NavLink to="/logout">Logout</NavLink>
                                </li>
                                :
                                <>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register">Register</NavLink>
                                    </li>
                                </>
                            }


                            <li>
                                <NavLink to="/profile" > { isLoggedIn ? `Hi, ${ user.username }` : null }</NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>
            </header >
        </>
    )
}

export default Navbar
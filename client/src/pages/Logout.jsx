import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Logout = () =>
{
    const { LogoutUser } = useAuth();
    const navigate = useNavigate();
    useEffect( () =>
    {
        LogoutUser();
    } ), [ LogoutUser ];

    return navigate( "/login" );
}

export default Logout
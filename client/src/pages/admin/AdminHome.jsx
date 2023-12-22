import { useAuth } from "../../store/auth"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const isLoggedIn = useAuth();

const AdminHome = () => 
{
    return (
        <div>AdminHome</div>
    )
}

export default AdminHome
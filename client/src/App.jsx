import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import LoadingBar from 'react-top-loading-bar'
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import AdminHome from "./pages/admin/AdminHome";
import AdminServices from "./pages/admin/AdminServices";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContacts from "./pages/admin/AdminContacts";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile/Profile";
import ChangePassword from './pages/profile/ChangePassword'
import EditProfile from './pages/profile/EditProfile'
import ProfileDetails from './pages/profile/ProfileDetails'
import 'bootstrap/dist/css/bootstrap.css';

const App = () =>
{
  // const [ progress, setProgress ] = useState( 0 )
  return <>
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/service" element={ <Service /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/logout" element={ <Logout /> } />
        <Route path="/profile/*" element={ <Profile /> } >
          <Route path="change-password" element={ <ChangePassword /> } />
          <Route path="edit-profile" element={ <EditProfile /> } />
          <Route path="" element={ <ProfileDetails /> } />
        </Route>
        <Route path="/admin/*" element={ <AdminHome /> } >
          <Route path="users" element={ <AdminUsers /> } />
          <Route path="contacts" element={ <AdminContacts /> } />
          <Route path="services" element={ <AdminServices /> } />
        </Route>
        <Route path="*" element={ <Error /> } />
      </Routes>
    </BrowserRouter>
  </>
};

export default App;
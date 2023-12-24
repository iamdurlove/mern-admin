import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import AdminHome from "./pages/admin/AdminHome";
// import AdminServices from "./pages/admin/AdminServices";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminContacts from "./pages/admin/AdminContacts";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';

const App = () =>
{
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
        <Route path="/admin/*" element={ <AdminHome /> } />
        {/* <Route path="/admin/users" element={ <AdminUsers /> } />
        <Route path="/admin/contacts" element={ <AdminContacts /> } />
        <Route path="/admin/services" element={ <AdminServices /> } /> */}
        <Route path="*" element={ <Error /> } />
      </Routes>
    </BrowserRouter>
  </>;
};

export default App;
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../App.css';
const Layout = () => {
    return (
        <div className="Inknut-Antiqua bg-slate-100 min-h-screen">
            <Navbar></Navbar>
        <div className="w-[80%]  mx-auto">
            <Outlet></Outlet>
        </div>
        </div>
    );
};

export default Layout;
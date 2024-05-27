// Header comment: Defines the layout component for rendering the main layout of the application, including the navbar and outlet for nested routes.

import { Outlet } from "react-router-dom"; // Importing Outlet from react-router-dom for rendering child routes
import Navbar from "../../components/Navbar"; // Importing Navbar component
import '../../App.css'; // Importing global styles

// Layout component definition
const Layout = () => {
    return (
        <div className="Inknut-Antiqua bg-slate-100 min-h-screen"> {/* Main container with custom background color and minimum screen height */}
            <Navbar></Navbar> {/* Rendering Navbar component */}
            <div className="w-[80%]  mx-auto"> {/* Container for main content with 80% width and centered horizontally */}
                <Outlet></Outlet> {/* Rendering child routes */}
            </div>
        </div>
    );
};

export default Layout; // Exporting Layout component

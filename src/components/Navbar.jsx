/*
Header Comment: Navbar Component
Description: This component represents the navigation bar of the application.
*/

import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import '../App.css'; // Importing CSS file for styling
import logo from '../assets/logo.png'; // Importing logo image

const Navbar = () => {
    return (
        <div className="">
            {/* Top Navigation Bar */}
            <div className="bg-[#E22232] px-2 md:px-40 py-4 flex justify-between items-center">
                <h1 className="Inknut-Antiqua text-white md:text-2xl">TRENDALL RESEARCH CENTRE</h1>
                {/* Logo */}
                <div className="bg-white w-40 ">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
            {/* Bottom Navigation Bar */}
            <div className="bg-gray-800 text-white px-4 md:px-40 py-2">
                <ul>
                    {/* Navigation Links */}
                    <Link className="mr-4" to="/">Home</Link>
                    <Link className="mr-4" to="/about">About</Link>
                    <Link className="mr-4" to="/search">Search</Link>
                    <Link className="mr-4" to="/news">News</Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

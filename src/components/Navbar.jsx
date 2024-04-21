import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png';
const Navbar = () => {
    return (
        <div className="">
        <div className="bg-[#E22232] px-2 md:px-40 py-4 flex justify-between items-center">
           <h1 className="Inknut-Antiqua text-white md:text-2xl">TRENDALL RESEARCH CENTRE</h1>
           <div className="bg-white w-40 ">
            <img src={logo} alt="" />
           </div>
        </div>
        <div className="bg-gray-800 text-white px-4 md:px-40 py-2">
            <ul>
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
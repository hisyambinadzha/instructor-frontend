import { Link } from "react-router-dom";

function Navbar(){
    return ( 
        <nav className="navbar">
            <div className="nav-brand">Instructor App</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <span className="nav-link-separator"> | </span>
                <Link to="/instructors">Instructors</Link>
                <span className="nav-link-separator"> | </span>
                <Link to="/dashboard">Dashboard</Link>
                <span className="nav-link-separator"> | </span>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}
export default Navbar;
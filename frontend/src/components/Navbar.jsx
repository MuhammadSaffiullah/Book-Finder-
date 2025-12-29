import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiBookHeart, BiSearch, BiUser } from 'react-icons/bi';
import { RiBookmarkFill } from 'react-icons/ri';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <RiBookmarkFill className="logo-icon" />
                    <span>BookFinder</span>
                </Link>

                <div className="navbar-links">
                    <NavLink to="/" current={location.pathname} icon={<BiSearch />} label="Search" />
                    {user ? (
                        <>
                            <NavLink to="/favorites" current={location.pathname} icon={<BiBookHeart />} label="Favorites" />
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                <span className="nav-label">Logout</span>
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" current={location.pathname} icon={<BiUser />} label="Login" />
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, current, icon, label }) => {
    const isActive = current === to;
    return (
        <Link
            to={to}
            className={`nav-link ${isActive ? 'active' : ''}`}
        >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
        </Link>
    );
};

export default Navbar;

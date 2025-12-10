// import React from "react"; // No need for { Component }
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import "./AppHeader.css";

interface AppHeaderProps {
    authenticated: boolean;
    onLogout: () => void;
}

const AppHeader = (props: AppHeaderProps) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        props.onLogout();
        navigate("/");
    };
    return (
        <header className="app-header">
            <div className="container">
                <div className="app-branding">
                    <Link to="/" className="app-title">
                        React Login
                    </Link>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        {props.authenticated ? (
                            <ul>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
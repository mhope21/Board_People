import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLeft = () => {
    return (
        <div className="sidebar-left">
            <ul>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/search">Search</a></li>
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/notifications">Notifications</a></li>
                <li><Link to="/">Home</Link></li>
                {/* Add more links as needed */}
            </ul>
        </div>
    );
}

export default SidebarLeft;

import React from 'react';
import { Link } from 'react-router-dom';
import TopDeals from './TopDeals';
import UserGreeting from './UserGreeting';
import { useAuth } from '../AuthContext';


const SidebarLeft = () => {
    // Use useAuth to get data about user and signOut function
    const { user, signOut } = useAuth(); 
    
    return (
        // Render components in sidebar, if user then add sign out link
        <div className="sidebar-left">
            <ul>
                <li><Link to="/">Home</Link></li>
                {user ? (
          <li><Link onClick={signOut}>Sign Out</Link></li>
        ) : null}
                
            </ul>
            <UserGreeting/>
            
            <TopDeals />
        </div>
    );
}

export default SidebarLeft;

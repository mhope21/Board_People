import React from 'react';
import { Link } from 'react-router-dom';
import TopDeals from './TopDeals';
import SomeComponent from './SomeComponent';
import { useAuth } from './AuthContext';


const SidebarLeft = () => {
    const { user, signOut } = useAuth(); 
    
    return (
        <div className="sidebar-left">
            <ul>
                <li><Link to="/">Home</Link></li>
                {user ? (
          <li><Link onClick={signOut}>Sign Out</Link></li>
        ) : null}
                
            </ul>
            <SomeComponent/>
            
            <TopDeals />
        </div>
    );
}

export default SidebarLeft;

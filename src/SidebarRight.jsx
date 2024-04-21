import React from 'react';
import TopGames from './TopGames';

const SidebarRight = () => {
    return (
        <div className="sidebar-right">
            <h3>Top 100 Games</h3>
            <TopGames />
            <div className="trending-content">
                <h3>Trending Now</h3>
                {/* Add trending content or other sections */}
            </div>
            {/* Add more content or sections as needed */}
        </div>
    );
}

export default SidebarRight;


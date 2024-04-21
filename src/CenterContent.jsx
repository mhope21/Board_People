// CenterContent.jsx
import React, { useState } from 'react';
import FilterPosts from './FilterPosts';
import { FaPlus } from 'react-icons/fa'; // Assuming you're using react-icons
import RecentPosts from './RecentPosts'; // Assuming you have a RecentPosts component
import { Link } from 'react-router-dom';
import { supabase } from './Client';

const CenterContent = ({handleCreatePost}) => {

  const [selectedFilter, setSelectedFilter] = useState('');
 
    // Handle filter selection
    const handleFilterChange = event => {
        setSelectedFilter(event.target.value);
    };

    

  return (
    <div className="center-content">
      <h1>Latest Posts</h1>
            <div className="top-bar">
                <FilterPosts
                    options={[
                        { value: 'comment', label: 'Comments' },
                        { value: 'question', label: 'Questions' },
                        // Add more filter options as needed
                    ]}
                    selectedOption={selectedFilter}
                    onSelectChange={handleFilterChange}
                />
                <Link to="/create-post">
                <button className="create-post-button" onClick={handleCreatePost}>
                    <FaPlus className="add-icon" />
                    Create Post
                </button>
                </Link>
            </div>
            <RecentPosts posts={RecentPosts} /> {/* Render the list of recent posts */}
    </div>
  );
}

export default CenterContent;

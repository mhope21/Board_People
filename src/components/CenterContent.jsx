// CenterContent.jsx
import React, { useState, useEffect } from 'react';
import FilterPosts from './FilterPosts';
import { FaPlus } from 'react-icons/fa';
import RecentPosts from './RecentPosts';
import { Link } from 'react-router-dom';
import { supabase } from '../Client';

const CenterContent = ({ handleCreatePost }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (selectedFilter === '') {
          response = await supabase.from('board_people').select('*').order('created_at', { ascending: false }).limit(9);
        } else {
          response = await supabase.from('board_people').select('*').eq('tags', selectedFilter).order('created_at', { ascending: false }).limit(9);
        }
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [selectedFilter]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  

  return (
    <div className="center-content">
      <h1>Latest Posts</h1>
      <div className="top-bar">
        <FilterPosts
          options={[
            { value: '', label: 'All Posts' },
            { value: 'Comments', label: 'Comments' },
            { value: 'Questions', label: 'Questions' },
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
      <RecentPosts posts={posts} selectedFilter={selectedFilter}/>
    </div>
  );
}

export default CenterContent;


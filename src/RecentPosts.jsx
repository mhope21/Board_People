import React, { useState, useEffect } from 'react';
import { supabase } from './Client'; // Import your Supabase client
import { FaRegComment, FaRegHeart, FaFlag, FaRegFolderOpen } from 'react-icons/fa';
import PostDetail from './PostDetail';
import { Link } from 'react-router-dom';

const RecentPosts = ({posts, selectedFilter, isFiltered}) => {


    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <h2>{isFiltered ? `${post.title} *` : post.title}</h2>
                    <p>By {post.author_id} on {new Date(post.created_at).toLocaleString()}</p>
                    <div className='second-line'>
                    <div className='icon-value'>
                    <FaRegComment className="comment-icon" />
                    <p>{post.comments_count}</p>
                    
                    <FaRegHeart className='heart-icon' />
                    <p>{post.likes}</p>
                    </div>
                    <div className='icon-value'>
                    <FaRegFolderOpen className='tag-icon' />
                    <p>{post.tags}</p>
                    </div>
                    </div>
                    <div className='to-detail'>
                    <Link to={`/post/${post.id}`}>Read More</Link>
                    </div>
                    {/* Additional post details like likes, comments, etc. */}
                </div>
            ))}
        </div>
    );
}

export default RecentPosts;




import React, { useState, useEffect } from 'react';
import { supabase } from './Client'; // Import your Supabase client

const RecentPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []); // Fetch posts on component mount

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('board_people')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    };

    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <h2>{post.title}</h2>
                    <p>By {post.author_id} on {new Date(post.created_at).toLocaleString()}</p>
                    <p>{post.content}</p>
                    {/* Additional post details like likes, comments, etc. */}
                </div>
            ))}
        </div>
    );
}

export default RecentPosts;




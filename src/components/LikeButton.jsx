// LikeButton.jsx (new component for managing likes)

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { supabase } from '../Client';
import PostDetail from '../routes/PostDetail';

function LikeButton({ postId,likeCount, setLikeCount }) {
  

  // Function to fetch initial like count
  const fetchLikeCount = async () => {
    try {
      const { data, error } = await supabase
        .from('board_people')
        .select('likes')
        .eq('id', postId)
        .single();
      if (error) throw error;
      setLikeCount(data.likes || 0);
    } catch (error) {
      console.error('Error fetching like count:', error.message);
    }
  };

  // Call fetchLikeCount on initial render and whenever postId changes
  useEffect(() => {
    fetchLikeCount();
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      // Toggle like status
      const newLikeCount = likeCount + 1
      console.log(newLikeCount)
      setLikeCount(newLikeCount);

      // Update the like count in the database
      const { data: updatedLikes, error: updateError } = await supabase
        .from('board_people')
        .update({ likes: newLikeCount })
        .eq('id', postId);

        if (updateError) throw updateError;
    console.log('Updated likes:', updatedLikes);
      // Fetch the updated like count again from the database
    await fetchLikeCount(); // Update likes state with the latest value from the database
    } catch (error) {
    console.error('Error updating like count:', error.message);
}
  };

  return (
    <>
    
    <Button variant='primary' onClick={handleLikeClick}>
      Like Post
    </Button>
    </>
  );
}

export default LikeButton;

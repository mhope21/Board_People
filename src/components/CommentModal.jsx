import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { supabase } from '../Client';
import { useAuth } from '../AuthContext';

function CommentModal({ postId, show, handleClose, updateComments, handleCommentModalClose }) {
  const {user} = useAuth();
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');

  const handleCommentSubmit = async () => {
    const authorId = user.email;
    // Log username and usernameType for debugging
    console.log('Username:', authorId);
    if (!commentText || !authorId) {
      console.error('Username or comment text is missing.');
      return;
    }

    try {
      // Determine the author_id based on usernameType selection

      // Insert the new comment
      const { data: insertedComment, error: insertError } = await supabase
        .from('comments')
        .insert([{ post_id: postId, author_id: user.email, comment: commentText }]);
      
      if (insertError) throw insertError;
      console.log('Comment added:', insertedComment);

      // Fetch updated comment list after insertion
      const { data: updatedComments, error: fetchError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);
      
      if (fetchError) throw fetchError;

      // Count the number of comments in the updatedComments array
      const newCommentCount = updatedComments.length;

      // Update the database with the new comment count
      const { error: updateError } = await supabase
        .from('board_people')
        .update({ comments_count: newCommentCount })
        .eq('id', postId);

      if (updateError) throw updateError;

      console.log('Comment count updated:', newCommentCount);

      // Call the updateComments callback to update comments in PostDetail
      updateComments(updatedComments || []);

      
      
      setCommentText('');
      handleClose();
      handleCommentModalClose();
      
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };
  // const handleCloseModal = () => {
  //   handleClose(); // Close the modal (handleClose is a prop passed from parent)
  //   handleCommentModalClose(); // Call the function to trigger refresh in PostDetail
  // };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <p>{user ? user.email : 'Anonymous'}</p>
        </Form.Group>
        <Form.Group controlId="commentText">
          <Form.Label>Comment:</Form.Label>
          <Form.Control as="textarea" rows={3} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCommentSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentModal;


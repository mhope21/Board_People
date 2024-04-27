import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './Client';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import CommentModal from './CommentModal';
import { Button } from 'react-bootstrap';
import LikeButton from './LikeButton';
import { FaRegComment, FaRegHeart, FaFlag, FaRegFolderOpen } from 'react-icons/fa';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [timeDifference, setTimeDifference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount]=useState(0);
  const [postUrl, setPostUrl] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);


  
    

  // Callback function to update comments in PostDetail
  const updateComments = (updatedComments) => {
    setComments(updatedComments);
  };

  useEffect(() => {
    async function fetchPostAndComments() {
      // Fetch post by ID
      const { data: postData, error: postError } = await supabase
        .from('board_people')
        .select('*')
        .eq('id', postId)
        .single();

      if (postError) {
        console.error('Error fetching post:', postError.message);
        return;
      }

      setPost(postData);
      setCommentCount(postData.comments_count)
      setPostUrl(postData.image_url);

      // Fetch comments for the post
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);

        

      if (commentsError) {
        console.error('Error fetching comments:', commentsError.message);
        return;
      }

      setComments(commentsData);

  }

    fetchPostAndComments();
  }, [postId, commentCount]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await supabase.from('board_people').select('*').eq('id', postId);
        if (data && data.length > 0) {
          setPost(data[0]);
          setEditedContent(data[0].content);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);


  const fetchPostDetails = async () => {
    try {
      // Fetch updated comment count from the database based on postId
      const { data: commentCountData, error } = await supabase
        .from('board_people')
        .select('comments_count')
        .eq('id', postId)
        .single();
      if (error) throw error;
      console.log(commentCountData.comments_count)

      // Update the comment count state with the latest count from the database
      setCommentCount(commentCountData.comments_count || 0);

      // Fetch updated comments based on postId
      // Update comments state accordingly
    } catch (error) {
      console.error('Error fetching post details:', error.message);
    }
  };

  const handleCommentModalClose = () => {
    // Trigger a refresh or update to fetch the latest comments and comment count
    fetchPostDetails();
    console.log('PostDetails is refreshed')
  };

  useEffect(() => {
    if (post) {
      const createdDate = new Date(post.created_at);
      const currentDate = new Date();
      const diffInHours = Math.floor((currentDate - createdDate) / (1000 * 60 * 60));
      setTimeDifference(diffInHours);
    }
  }, [post]);



  if (!post) {
    return <div>Loading...</div>;
  }

  

  const handleUpdateComment = (comment) => {
    const updatedComment = prompt('Update your comment:', comment.comment);
    if (updatedComment !== null) {
      // Call a function to update the comment in the database
      updateCommentInDatabase(comment.id, updatedComment);
    }
  };
  
  const handleDeleteComment = async (commentId) => {
    // Call a function to delete the comment from the database
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) throw error;
      // Update the comments state after deletion
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);

      fetchPostDetails();
      const decreasedCount = commentCount - 1
      setCommentCount(decreasedCount)

      // Update the database with the new comment count
      const { error: updateError } = await supabase
        .from('board_people')
        .update({ comments_count: decreasedCount })
        .eq('id', postId);

      if (updateError) throw updateError;

      console.log('Comment count updated:', decreasedCount);
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const updateCommentInDatabase = async (commentId, updatedComment) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ comment: updatedComment })
        .eq('id', commentId);
      if (error) throw error;
      // Update the comments state with the updated comment
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, comment: updatedComment } : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await supabase.from('board_people').delete().eq('id', postId);
      // Redirect or update UI after successful deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = async () => {
    try {
      // Update the post content in the database
      await supabase
        .from('board_people')
        .update({ content: editedContent })
        .eq('id', postId);
  
      // Fetch the updated post data
      const { data: updatedPost, error } = await supabase
        .from('board_people')
        .select('*')
        .eq('id', postId)
        .single();
  
      if (error) {
        console.error('Error fetching updated post:', error);
        return;
      }
  
      // Update UI or show confirmation after successful edit
      setPost(updatedPost); // Assuming you have a state variable 'post' to store the updated post
      setEditMode(false);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };
  
  
  

  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  

  return (
    <>
    <div className='detail-page'>
    <div className="post-detail">
      <div className='detail-content'>
      <h2>{post.title}</h2>
      <p><strong>By {post.author_id}  | {timeDifference} h ago</strong></p>
      {/* <p>{post.content}</p> */}
      {editMode ? (
        <>
          
          <textarea className="form-control" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <button className="btn btn-primary mt-2" onClick={handleEdit}>Save</button>
        
        </>
      ) : (
        <>
          <p>{post.content}</p>
          <div className="post-actions">
          <div className="d-flex justify-content-end gap-2 mb-3">
          <button className="btn btn-secondary mr-5 btn-sm" onClick={() => setEditMode(true)}>Edit</button>
            <button className="btn btn-danger btn-sm ml-5" onClick={handleDelete}>Delete</button>
            
            
            </div>
          </div>
        </>
      )}
      {postUrl && (
      <div className='post-image-container' style={{maxWidth: '100%'}}>
      <img src={postUrl} alt="Post Image" className='img-fluid' /> {/* Render the image */}
      </div>
      )}

      <div className='second-line'>
        <div className='icon-value'>
        <FaRegComment className="comment-icon" />
        <p>{commentCount}</p>
                    
        <FaRegHeart className='heart-icon' />
        <p>{likeCount}</p>
        </div>
        <div className='icon-value'>
        <FaRegFolderOpen className='tag-icon' />
        <p>{post.tags}</p>
        </div>
        </div>

      <div className='comment-content'>
      
      <div className='button-container'>
      {/* Render LikeButton and pass likeCount and setLikeCount */}
      <LikeButton postId={postId} likeCount={likeCount} setLikeCount={setLikeCount} />
      <Button variant="primary" onClick={handleShowModal}>Add Comment</Button>
      </div>
      <h3>Comments</h3>

      <CommentModal postId={postId} show={showModal} updateComments={updateComments} handleClose={handleCloseModal} handleCommentModalClose={handleCommentModalClose} />
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author_id}</strong>: {comment.comment}
            <div className="d-flex justify-content-end gap-2 mb-3">
            <button className="btn btn-secondary btn-sm mr-5" onClick={() => handleUpdateComment(comment)}>Edit</button>
            <button className="btn btn-danger btn-sm m1-5" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            
        
        
      </div>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default PostDetail;

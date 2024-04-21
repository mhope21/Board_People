import { useState } from 'react';
import { supabase } from './Client'; // Assuming you have your Supabase client initialized
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

const CreatePostPage = ({handleCreatePost}) => {
  const [post, setPost] = useState({
    author_id: "",
    title: '',
    content: '',
    image_url: '',
    tags: 'comment', // Default type, can be changed by user
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...post,
    };
    await handleCreatePost(postData); // Call handleCreatePost with post data
    // Clear form fields or show success message if needed
    setPost({
      author_id: '',
      title: '',
      content: '',
      image_url: '',
      tags: 'comment',
      
    });
  };

  

  return (
    <div className='create-post'>
      <SidebarLeft />
    <div className="create-post-card">
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='author_id'>Username:</label>
        <input type='author_id' id='author_id' name='author_id' value={post.author_id} onChange={handleInputChange} />
        <label htmlFor='title'>Title:</label>
        <input type='text' id='title' name='title' value={post.title} onChange={handleInputChange} />

        <label htmlFor="content">Body:</label>
        <textarea type="text" id="content" name="content" value={post.content} onChange={handleInputChange} />

        <label htmlFor="image_url">Image URL:</label>
        <input type="text" id="image_url" name="image_url" value={post.image_url} onChange={handleInputChange} />

        <label htmlFor="tags">Tag:</label>
        <select id="tags" name="tags" value={post.tags} onChange={handleInputChange}>
          <option value="comment">Comment</option>
          <option value="question">Question</option>
        </select>

        <button type="submit">Create Post</button>
      </form>
    </div>
    <SidebarRight />
    </div>
  );
};

export default CreatePostPage;

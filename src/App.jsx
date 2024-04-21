import React from 'react';
import './App.css'; // Import your CSS file
import HomePage from './HomePage'; // Import your HomePage component
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import CreatePostPage from './CreatePostPage'; 
import { supabase } from './Client';
import CenterContent from './CenterContent';

function App() {
  const handleCreatePost = async (postData) => {
    try {
      const { data, error } = await supabase
        .from('board_people')
        .insert([postData]);
  
      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        console.log('Post created successfully:', data);
        // Optionally, redirect or show a success message
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };
  
 

  return (
    
    <BrowserRouter>
    <div className="App">
      <header className="header">
        <h1 className='bungee-spice-regular'>Board People</h1>
        <h2>Community Forum</h2>
      </header>
      <div className="container">
        
        
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/center" element={<CenterContent handleCreatePost={handleCreatePost} />} />
        <Route path='/create-post' element={<CreatePostPage handleCreatePost={handleCreatePost} />} />
      </Routes>
      
    
      </div>
    </div>
    </BrowserRouter>

  );
}

export default App;


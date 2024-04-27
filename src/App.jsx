import React, {useState} from 'react';
import './App.css'; // Import your CSS file
import HomePage from './HomePage'; // Import your HomePage component
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import CreatePostPage from './CreatePostPage'; 
import { supabase } from './Client';
import CenterContent from './CenterContent';
import Layout from './Layout';
import PostDetail from './PostDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import RecentPosts from './RecentPosts';
import CommentModal from './CommentModal';
import FilterPosts from './FilterPosts';
import LoginForm from './LoginForm';
import { AuthProvider } from './AuthContext';
import PrivateRoutes from './PrivateRoutes';
import SomeComponent from './SomeComponent';


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
    <AuthProvider>
    <Router> 
     
    <div className='App'>
      <header className="header">
        <h1 className='bungee-spice-regular'>Board People</h1>
        <h2>Community Forum</h2>
      </header>
      
      <div className='container'>
      <SidebarLeft/> 
      
                   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/center" element={<CenterContent handleCreatePost={handleCreatePost} />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/create-post'element={<CreatePostPage handleCreatePost={handleCreatePost} />}/>
          <Route path='/post/:postId' element={<PostDetail />} />
        </Route>        
        <Route path="/login" element={<LoginForm />} />                          
      </Routes>  
      <SidebarRight/>
      </div>
    </div>
    
    </Router>
    </AuthProvider>
    

  );
}

export default App;


import React, {useState} from 'react';
import './App.css';
import HomePage from './routes/HomePage';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import CreatePostPage from './routes/CreatePostPage'
import { supabase } from './Client';
import CenterContent from './components/CenterContent';
import PostDetail from './routes/PostDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarLeft from './components/SidebarLeft';
import LoginForm from './routes/LoginForm'
import { AuthProvider } from './AuthContext';
import PrivateRoutes from './components/PrivateRoutes';
import SidebarRight from './components/SidebarRight';
import Layout from './Layout';


function App() {
   
  {/*Raise handleCreatePost up a level for callback function */}
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
    <>
    {/* Wrap app in AuthProvider so that all components have access to user state */}
    <AuthProvider>
    <Router> 
     
    <div className='App'>
      <header className="header">
        <h1 className='bungee-spice-regular'>Board People</h1>
        <h2>Community Forum</h2>
      </header>
      <Layout>
      <div className='container'>
      <SidebarLeft/> 
      
      {/* Create routes for app and private routes for authentication */}          
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
      </Layout>
    </div>
    
    
    </Router>
  
    </AuthProvider>
    </>
  
    

  );
}

export default App;


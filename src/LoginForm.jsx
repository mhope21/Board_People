import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Assuming AuthContext is in the same directory
import { supabase } from './Client';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { user, signOut, login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('')
    
    const navigate = useNavigate(); // Initialize navigate

    const handleAuth = async (e) => {
        e.preventDefault();
        
        console.log('Authenticating...');
        setError(null); // Clear any previous errors
        try {
        //   if (!user) {
        //     throw new Error('User not authenticated.');
        // }
          if (isSignUp) {
                // Perform sign up using Supabase
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                
                // Insert the username into your Supabase table
                console.log(email)
                console.log(password)
                setUsername(email);

                const { data, insertError } = await supabase
                    .from('user')
                    .insert({ email, username })
                    .single();
                if (insertError) throw insertError;
                
                console.log('User signed up and inserted:', data);
                alert("You are now signed up. Welcome! Check your email to confirm and return to log in.")
                login(user);
                navigate('/')
            } else {
                // Perform login using Supabase
                const { user, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                console.log(email)
                console.log(password)
                
                console.log('User logged in:', email);
                login(user);
                console.log(user);
                navigate('/')
            }
        } catch (error) {
            console.error('Authentication error:', error.message);
            alert('Either your entry does not match our records or your email is not confirmed. Try again.')
        }
    };

    const handleToggleSignUp = () => {
      {error && <Alert variant="danger">{error}</Alert>}

        setIsSignUp((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            signOut();
            console.log('User logged out');
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    const handleClearForm = () => {
      setEmail('');
      setPassword('');
  };

    return (
      <div>
      {user ? (
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
      ) : (
          <Form onSubmit={handleAuth}>
              
              <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </Form.Group>
              <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
              {isSignUp ? 'Sign Up' : 'Log In'}
              </Button>
              <Button variant="info" onClick={handleClearForm} className="mt-3 mx-2">
              Clear
              </Button>
              <Button variant="secondary" onClick={handleToggleSignUp} className="mt-3">
              {isSignUp ? 'Switch to Log In' : 'Switch to Sign Up'}
              </Button>

          </Form>
      )}
  </div>
    );
};

export default LoginForm;




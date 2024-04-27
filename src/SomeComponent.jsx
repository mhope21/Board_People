// Import the necessary dependencies
import React from 'react';
import { useAuth } from './AuthContext';

// Define your component
const SomeComponent = () => {
  // Use the useAuth hook to access the authentication context
  const { user } = useAuth();
  
  return (
    <div className="card">
            <div className="card-body">
                {/* Check if the user object is valid before accessing user data */}
                {user && user.email ? (
                    <h5 className="card-title">Hello, {user.email}!</h5>
                ) : (
                    // Display a message if the user object is not valid
                    <h5 className="card-title">Hello, Guest!</h5>
                )}
            </div>
        </div>
  );
};

// Export the component
export default SomeComponent;



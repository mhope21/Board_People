import React from 'react';
import { useAuth } from '../AuthContext';

const UserGreeting = () => {
  // Use the useAuth hook to get necessary data
  const {session, user} = useAuth();

  return (
    <div className="card">
            <div className="card-body">
                {/* Check if the user object is valid before accessing user data */}
                {user && session.user.email ? (
                    <h5 className="card-title">Hello, {session.user.email}!</h5>
                ) : (
                    // Display a message if the user and session object is not valid
                    <h5 className="card-title">Hello, Guest!</h5>
                )}
            </div>
        </div>
  );
};


export default UserGreeting;



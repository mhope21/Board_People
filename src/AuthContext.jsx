import React, { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from './Client';

// Create a context for authentication
const AuthContext = createContext({ session: null, user: null, signOut: () => {} });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        const setData = async () => {
            try {
                const { data: sessionData, error } = await supabase.auth.getSession();
                if (error) throw error;
                console.log('Session Data:', sessionData); // Log session data for debugging
                setSession(sessionData);
                setUser(sessionData?.user);
            } catch (error) {
                console.error('Error fetching session:', error.message);
            } finally {
                setLoading(false);
            }
        };
        const listener = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('Auth State Change:', session); // Log authentication state changes
            setSession(session);
            setUser(session?.user);
            setLoading(false);
        });

        setData();

        return () => {
            if (listener && typeof listener.unsubscribe === 'function') {
                listener.unsubscribe();
            }
        };
    }, []);

    const login = (userData) => {
        setUser(userData); // Update user state in AuthContext
    };

    const value = {
        session,
        user,
        login,
        signOut: () => supabase.auth.signOut(),
    };

    

    // Use a provider to pass down the value
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};



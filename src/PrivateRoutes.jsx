// PrivateRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import your AuthContext hook

const PrivateRoutes = () => {
  const { session, user } = useAuth(); // Use the AuthContext hook to access authentication data

  const isAuthenticated = session?.user && user;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};


export default PrivateRoutes;


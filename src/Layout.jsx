import React from 'react';
import { Container } from 'react-bootstrap'; // Assuming you're using Bootstrap for layout components
import './Layout.css'; // Import your CSS file for styling

const Layout = ({ children }) => {
  return (
    <div className="background-image">
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default Layout;

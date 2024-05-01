import React from 'react';
import { Container } from 'react-bootstrap';
import './Layout.css';

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

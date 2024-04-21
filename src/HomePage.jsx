import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import CenterContent from './CenterContent';

const HomePage = () => {
  return (
    <div className="home-page">
      <SidebarLeft />
      <CenterContent />
      <SidebarRight />
    </div>
  );
}

export default HomePage;

import React from 'react';
import Header from './Header';
import './index.less';

function MainLayout({ children, location }) {
  return (
    <div className="layoutContainer">
      <Header location={location} />
      <div className="content">
        <div className="main">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
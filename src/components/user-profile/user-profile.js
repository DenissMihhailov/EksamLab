import React from 'react';
import './user-profile.css';
import { Navigate } from 'react-router-dom';

function Header() {
    const isLoggedIn = !!localStorage.getItem('accessToken');

    if (!isLoggedIn) {
      return <Navigate to="/authorization" replace />;
    }
 
  return (
    <header className="header">
      
    </header>
  );
}

export default Header;
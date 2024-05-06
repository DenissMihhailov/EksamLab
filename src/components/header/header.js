import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');


  const showLoginContainer = () => {
    navigate('/authorization');
  };

  const showMainContainer = () => {
    navigate('/');
  };

  const showProfileContainer = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-cell">
        <h1 onClick={showMainContainer}>Eksam<span>Lab</span></h1>
      </div>
      <div className="header-cell">
        {isLoggedIn ? (
          <>
          <button onClick={showProfileContainer}>Профиль</button>
          <button onClick={handleLogout}>Выход</button> 
        </>
        ) : (
          <button onClick={showLoginContainer}>Вход</button>
        )}
      </div>
    </header>
  );
}

export default Header;
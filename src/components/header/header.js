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

  return (
    <header className="header">
      <div className="header-cell">
        <h1 onClick={showMainContainer} title="Главная страница">Eksam<span>Lab</span></h1>
      </div>
      <div className="header-cell">
        {isLoggedIn ? (
          <button onClick={showProfileContainer} title="Войти в профиль">Профиль</button>
        ) : (
          <button onClick={showLoginContainer}>Вход</button>
        )}
      </div>
    </header>
  );
}

export default Header;
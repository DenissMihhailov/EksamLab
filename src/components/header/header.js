import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const showLoginContainer = () => {
    navigate('/authorization');
  };

  const showMainContainer = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-cell">
      <h1 onClick={showMainContainer}>Eksam<span>Lab</span></h1>
      </div>
      <div className="header-cell">
      <button onClick={showLoginContainer}>Вход</button>
      </div>
    </header>
  );
}

export default Header;
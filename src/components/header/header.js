import React from 'react';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-cell">
      <h1>Eksam<span>Lab</span></h1>
      </div>
      <div className="header-cell">
      <button>Вход</button>
      </div>
    </header>
  );
}

export default Header;
import React from 'react';
import './authorization.css';

function Authorization() {
  return (
    <div className='authorization-container'>
      <h1>Авторизация</h1>

      <div className='input-with-text'>
        <p>Почта</p>
        <input type='text'></input>
      </div>
      <div className='input-with-text'>
        <p>Пароль</p>
        <input type='text'></input>
      </div>

      <button>Войти</button>
    </div>
  );
}

export default Authorization;
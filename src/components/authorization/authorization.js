import React from 'react';
import './authorization.css';
import { useNavigate } from 'react-router-dom';

function Authorization() {
  const navigate = useNavigate();

  const showRegistrationContainer = () => {
    navigate('/registration');
  };

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
      <div className='input-with-text'>
        <p className='registration-button' onClick={showRegistrationContainer}>Зарегестрироваться</p>
      </div>

      <button>Войти</button>
    </div>
  );
}

export default Authorization;
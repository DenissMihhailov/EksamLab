import React, { useState } from 'react';
import './change-password.css';
import { SpinnerCircularFixed } from 'spinners-react';
import { jwtDecode } from 'jwt-decode';

function Registration() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.userEmail;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    if(password === '' || oldPassword === '' || confirmPassword === ''){
      setErrorMessage('Заполните все данные');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword: password, email }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setErrorMessage('Пароль изменен');
      } else {
        if (response.status === 401 && responseData.message === 'Old password does not match') {
          setErrorMessage('Старый пароль неправильный');
        } else {
          throw new Error('Ошибка сервера. Попробуйте позже');
        }
      }
    } catch (error) {
      console.error('Ошибка смены пароля:', error);
      setErrorMessage('Ошибка смены пароля');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='authorization-container'>
      <h1>Сменить пароль</h1>

      <div className='input-with-text'>
        <p>Старый пароль</p>
        <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>
      <div className='input-with-text'>
        <p>Новый пароль</p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>
      <div className='input-with-text'>
        <p>Повторите новый пароль</p>
        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>

      <button className={`${isLoading ? 'disabled' : ''}`}  onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <SpinnerCircularFixed size={30} thickness={180} speed={138} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.5)" /> : errorMessage ? errorMessage : 'Подтвердить'}
      </button>

    </div>
  );
}

export default Registration;
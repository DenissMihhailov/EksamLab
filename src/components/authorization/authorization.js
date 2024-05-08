import React, { useState } from 'react';
import './authorization.css';
import { SpinnerCircularFixed } from 'spinners-react';
import { useNavigate } from 'react-router-dom';

function Authorization() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showRegistrationContainer = () => {
    navigate('/registration');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {

    if(password === '' || email === ''){
      setErrorMessage('Заполните все данные');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        setIsLoading(false);
        navigate('/');
      } else {
        const data = await response.json();
        if (response.status === 401 && data.message === 'Invalid email or password') {
          setIsLoading(false);
          setErrorMessage('Неправильная почта или пароль');
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Ошибка аутентификации:', error);
      setErrorMessage('Ошибка аутентификации');
    }
  };

  return (
    <div className='authorization-container'>
      <h1>Авторизация</h1>

      <div className='input-with-text'>
        <p>Почта</p>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>
      <div className='input-with-text'>
        <p>Пароль</p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>

      <p className='registration-button' onClick={showRegistrationContainer}>Зарегистрироваться</p>

      <button className={`${isLoading ? 'disabled' : ''}`}  onClick={handleLogin} disabled={isLoading}>
        {isLoading ? <SpinnerCircularFixed size={30} thickness={180} speed={138} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.5)" /> : errorMessage ? errorMessage : 'Войти'}
      </button>
    </div>
  );
}

export default Authorization;
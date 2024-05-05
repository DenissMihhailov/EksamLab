import React, { useState } from 'react';
import './registration.css';
import { SpinnerCircularFixed } from 'spinners-react';
import EmailConfirmation from '../email-confirmation/email-confirmation';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [code, setRandomCode] = useState(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateRandomCode = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    if(password === '' || email === '' || confirmPassword === ''){
      setErrorMessage('Заполните все данные');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Неверный формат электронной почты');
      return;
    }

    setIsLoading(true);

    var randomCode = generateRandomCode();
    setRandomCode(`${randomCode}`)

    try {
      const response = await fetch('/api/send-registration-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: randomCode }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setShowEmailConfirmation(true);
      } else {
        if (response.status === 400 && responseData.message === 'User already exists') {
          setErrorMessage('Такой пользователь уже зарегистрирован');
        } else {
          throw new Error('Ошибка сервера. Попробуйте позже');
        }
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setErrorMessage('Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  if (showEmailConfirmation) {
    return (
        <EmailConfirmation email={email} password={password} code={code} />
    );
  }

  return (
    <div className='authorization-container'>
      <h1>Регистрация</h1>

      <div className='input-with-text'>
        <p>Почта</p>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='input-with-text'>
        <p>Пароль</p>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='input-with-text'>
        <p>Повторите пароль</p>
        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      <button className={`${isLoading ? 'disabled' : ''}`}  onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <SpinnerCircularFixed size={30} thickness={180} speed={138} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.5)" /> : errorMessage ? errorMessage : 'Подтвердить'}
      </button>

    </div>
  );
}

export default Registration;
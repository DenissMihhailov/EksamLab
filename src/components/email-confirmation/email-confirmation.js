import React, { useState } from 'react';
import './email-confirmation.css';
import { SpinnerCircularFixed } from 'spinners-react';

function EmailConfirmation({ email, password, code }) {
  const [userCode, setUserCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if(userCode === ''){
      setErrorMessage('Введите код');
      return;
    }

    if(code !== userCode){
      setErrorMessage('Неверный код');
      return;
    }else{

      setIsLoading(true)
      
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password}),
        });
  
        const responseData = await response.json();
  
        if (response.status === 200) {
          setErrorMessage('Регистрация прошла успешно');
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

    }


  }

  return (
    <div className='authorization-container'>
      <h1>Подтверждение</h1>

      <p className='confirmation-info'>На вашу почту пришло письмо с кодом подтверждения</p>

      <div className='input-with-text'>
        <p>Код с письма</p>
        <input type='text' value={userCode} onChange={(e) => setUserCode(e.target.value)} />
      </div>
      
      <button className={`${isLoading ? 'disabled' : ''}`}  onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <SpinnerCircularFixed size={30} thickness={180} speed={138} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.5)" /> : errorMessage ? errorMessage : 'Подтвердить'}
      </button>
    </div>
  );
}

export default EmailConfirmation;
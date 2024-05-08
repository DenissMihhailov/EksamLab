import React from 'react';
import './user-profile.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Profile() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.userEmail;

    if (!isLoggedIn) {
      return <Navigate to="/authorization" replace />;
    }

    const handleLogout = () => {
      localStorage.removeItem('accessToken'); 
      navigate('/');
    };

    const showChangePassword = () => {
      navigate('/change-password');
    };

    const statistic = []

    const subject = [
      {title: 'Тригонометрия', procent: '12%'}, 
      {title: 'Планиметрия', procent: '60%'}, 
      {title: 'Геометрия', procent: '45%'}, 
      {title: 'Задачи на проценты', procent: '90%'}, 
      {title: 'Теория вероятностей', procent: '20%'}, 
      {title: 'Функции', procent: '5%'}, 
    ]
  
    for (let i = 0; i < subject.length; i++) {
      statistic.push(
        <div className='subject-progress-profile-container'>
          <p>{subject[i].title}</p>
            <div className='statistic-stick'><p>{subject[i].procent}</p>
            <div className='color-statistic-stick' style={{ width: subject[i].procent }}></div>
          </div>
        </div>
      );
    }

    // const changePassword = () => {
    //   localStorage.removeItem('accessToken'); 
    //   navigate('/');
    // };
 
  return (
    <div className='profile-container'>
      <img onClick={handleLogout} className='exit-icon' src="/icons/exit.png" alt="Exit Icon" title="Выйти из аккаунта"/>
      <h1>Профиль</h1>

      <p className='email-profile'>{email}</p>

      <button className='change-password-button' onClick={showChangePassword}>Сменить пароль</button>

      <div className='divider'></div>

      <div className='progress-profile-container'>
        <h1>Прогресс по математике</h1>

        <div className='subjects-progress-profile-container'>
          {statistic}
        </div>

      </div>

    </div>
  );
}

export default Profile;
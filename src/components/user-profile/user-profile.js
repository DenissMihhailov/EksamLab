import React, { useEffect, useState } from 'react';
import './user-profile.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Profile() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');
    const [themeStatistic, setThemeStatistic] = useState([]);
    const [loading, setLoading] = useState(true);
    const subjectTitle = 'Математика' // Пока только математика
    const [widthAfter, setWidthAfter] = useState(false);

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.userEmail;

    const handleLogout = () => {
      localStorage.removeItem('accessToken'); 
      navigate('/');
    };

    const showChangePassword = () => {
      navigate('/change-password');
    };

    useEffect(() => {
      const getThemesStatistic = async (subjectTitle, email) => {
        try {
          const response = await fetch('/api/tasks/get-themes-progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subjectTitle, email }),
          });
  
          if (response.ok) {
            const { themesStatistic } = await response.json();
            setThemeStatistic(themesStatistic)
            setTimeout(() => {
              setWidthAfter(true);
            }, 100);
          }else {
            const data = await response.json();
            throw new Error(data.message);
          }
        } catch (error) {
          console.error('Ошибка при получении списка годов:', error);
        } finally {
          setLoading(false);

          setTimeout(() => {
            setWidthAfter(true);
          }, 1000);
        }
      };
  
      getThemesStatistic(subjectTitle, email);
    }, [subjectTitle, email]);


  if (!isLoggedIn) {
    return <Navigate to="/authorization" replace />;
  }
 
  return (
    <div className='profile-container'>
      <img onClick={handleLogout} className='exit-icon' src="/icons/exit.png" alt="Exit Icon" title="Выйти из аккаунта"/>
      <h1>Профиль</h1>

      <p className='email-profile'>{email}</p>

      <button className='change-password-button' onClick={showChangePassword}>Сменить пароль</button>

      <div className='divider'></div>

      <div className='progress-profile-container'>
        <h1>Прогресс по математике</h1>

        {loading ? (
        <div className='subjects-progress-profile-container'>
          {[...Array(5)].map((_, index) => (
            <div className='subject-progress-profile-container-skeleton' key={index}>
                <div className='statistic-stick-p-skeleton'></div>
                <div className='statistic-stick-skeleton'></div>
            </div>
          ))}
        </div>
      ) : (
        <div className='subjects-progress-profile-container'>
          {themeStatistic.map((theme, index) => (
            <div className='subject-progress-profile-container' key={index}>
              <p>{theme.title}</p>
              <div className='statistic-stick'>
                <p>{theme.procent}</p>
                <div className='color-statistic-stick' style={{ width: widthAfter ? `${theme.procent}` : '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default Profile;
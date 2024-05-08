import React from 'react';
import './theme-subject.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import Sidebar from '../sidebar/sidebar';

function Theme() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    // const token = localStorage.getItem('accessToken');
    // const decodedToken = jwtDecode(token);
    // const email = decodedToken.userEmail;

    if (!isLoggedIn) {
      return <Navigate to="/authorization" replace />;
    }

    const showTasks = () => {
      navigate('/tasks')
    }

    const themeInfo = {
      themeTitle: 'Полные экзамены', 
      themeText: `
        На этой странице вы можете выбрать конкретный год, в котором проводился государственный экзамен и прорешать его целиком. (Задания и их порядок повторяют реальные экзамены, проводимые в выбранном году)
        <split>
        Кроме того, выполнение заданий из конкретных тем (Например: Задание по тригонометрии 2022) автоматически засчитывает прогресс экзамена из года, откуда это задание было взято.
        <split>
        Вы можете видеть свой текущий прогресс по экзамену, по степени заполнения кнопки зеленым цветом.
      `, 
      };

      const themeStatistic = {procent: '12%'}

      const testYear = [
        {year: '2014', procent: '12%'}, 
        {year: '2015', procent: '74%'}, 
        {year: '2016', procent: '40%'}, 
        {year: '2017', procent: '8%'}, 
        {year: '2018', procent: '90%'}, 
        {year: '2019', procent: '0%'}, 
      ]

      const testButtons = []
      
      for (let i = 0; i < testYear.length; i++) {
        testButtons.push(
        <div className='test-button-container' onClick={showTasks}>
          <div className='test-button' title={testYear[i].procent}>
            <p>{testYear[i].year}</p>
            <div className='color-test-button' style={{ width: testYear[i].procent }}></div>
          </div>
        </div>
      );
    }
 
  return (
    <div>
      <Sidebar />
    <div className='without-navbar-container'>
      <div className='theme-container'>
        <h1>{themeInfo.themeTitle}</h1>

        {themeInfo.themeText.split('<split>').map((paragraph, index) => (
          <React.Fragment key={index}>
            <p className='theme-text'>{paragraph}</p>
            <br />
          </React.Fragment>
        ))}

        <div className='progress-theme-container'>
            <p>Прогресс по теме</p>
              <div className='statistic-stick'><p>{themeStatistic.procent}</p>
              <div className='color-statistic-stick' style={{ width: themeStatistic.procent }}></div>
            </div>
        </div>

        <div className='test-buttons-container'>
          {testButtons}
        </div>

      </div>
    </div>
    </div>
  );
}

export default Theme;
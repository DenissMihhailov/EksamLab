import React from 'react';
import './task-subject.css';
import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import Sidebar from '../sidebar/sidebar';

function Task() {
    // const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    // const token = localStorage.getItem('accessToken');
    // const decodedToken = jwtDecode(token);
    // const email = decodedToken.userEmail;

    if (!isLoggedIn) {
      return <Navigate to="/authorization" replace />;
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
        <div className='test-button-container'>
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
      <div className='task-container'>
       <h1>Экзамен 2023</h1>

       <div className='exam-task-container'>

       <div className='part-container'>
       <p className='part-text'>Часть 1</p>
       <p className='part-done'>Выполнено</p>
       </div>

       <p className='task-order-text'>Задание 7. (10 баллов)</p>
       <div className='task-description-container'>
        <p className='task-description'>Ученица Мари в компьютерной программе GeoGebra построила треугольник ABC.
          Длина стороны BC треугольника была равна 10 см, а прилежащие к этой стороне углы
          равны ∠ACB = 25° и ∠ABC = 50°. К стороне BC Мари провела высоту AD, которая
          разделила треугольник ABC на две части: треугольники ABD и ACD. Так как угол ABD
          был в 2 раза больше угла ACD, Мари предположила, что площадь треугольника ACD
          в 2 раза больше площади треугольника ABD.
          Вычислите площади треугольников ACD и ABD и выясните, была ли права Мари</p>
       </div>

       <p className='answer-task-text'>Ответы (3):</p>

       <div className='answers-task-container'>
        <div className='answer-task-container'>
          <p>Площадь треугольника ACD</p>
          <input></input>
        </div>
        <div className='answer-task-container'>
          <p>Площадь треугольника ABD</p>
          <input></input>
        </div>
        <div className='answer-task-container'>
          <p>Права ли Мари?</p>
          <input></input>
        </div>
       </div>

       </div>

       <div className='buttons-task-container'>
       <img className='previous-task-icon' src="/icons/arrow.png" alt="Exit Icon" title="Предыдущее задание"/>
       <img className='next-task-icon' src="/icons/arrow.png" alt="Exit Icon" title="Следующее задание"/>
        <button>Проверить ответы</button>
       </div>


      </div>
    </div>
    </div>
  );
}

export default Task;
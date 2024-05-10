import React, { useState, useEffect } from 'react';
import './task-subject.css';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';


function Task({ subjectTitle, themeTitle, taskYear}) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskArray, setTaskArray] = useState([]);
  

  const getTasks = async (subjectTitle, themeTitle, taskYear) => {
    try {
      const response = await fetch('/api/tasks/get-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjectTitle, themeTitle, taskYear }),
      });

      if (response.ok) {
        const tasks = await response.json();

        setTaskArray(tasks);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Ошибка при получении списка тем:', error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (taskYear) {
      // setLoading(true);
      getTasks(subjectTitle, themeTitle, taskYear);
    }
  }, [subjectTitle, themeTitle, taskYear]);

  const goToPreviousTask = () => {
    setCurrentTaskIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const goToNextTask = () => {
    setCurrentTaskIndex(prevIndex => Math.min(taskArray.length - 1, prevIndex + 1));
  };

  const currentTask = taskArray[currentTaskIndex];

  return (
    <div>
        <div className='task-container'>
          <h1>{themeTitle} {taskYear}</h1>
      {currentTask && (
          <div className='exam-task-container'>
            <div className='part-container'>
              <p className='part-text'>Часть {currentTask.partOfExam}</p>
              <p className='part-done'>{currentTask.isDone ? 'Выполнено' : ''}</p>
            </div>
            <p className='task-order-text'>Задание {currentTask.orderInExam}. ({currentTask.pointsInExam} баллов)</p>
            <div className='task-description-container'>
              <p className='task-description'>{currentTask.text}</p>
            </div>
            <p className='answer-task-text'>Ответы ({currentTask.answers.length}):</p>
            <div className='answers-task-container'>
              {currentTask.answers.map((answer, index) => (
                <div key={index} className='answer-task-container'>
                  <p>{answer.answerText}</p>
                  <input type="text" />
                </div>
              ))}
            </div>
          </div>
          )}
          <div className='buttons-task-container'>
          {currentTaskIndex > 0 && <img className='previous-task-icon' src="/icons/arrow.png" alt="Exit Icon" title="Предыдущее задание" onClick={goToPreviousTask}/>}
          {currentTaskIndex < taskArray.length - 1 && <img className='next-task-icon' src="/icons/arrow.png" alt="Exit Icon" title="Следующее задание" onClick={goToNextTask}/>}
            <button>Проверить ответы</button>
          </div>
        </div>
      </div>

  );
}

export default Task;
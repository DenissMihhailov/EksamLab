import React, { useState, useEffect } from 'react';
import './task-subject.css';
import { jwtDecode } from 'jwt-decode';
import { SpinnerCircularFixed } from 'spinners-react';


function Task({ subjectTitle, themeTitle, taskYear }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskArray, setTaskArray] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [buttonMessage, setButtonMessage] = useState()

  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const email = decodedToken.userEmail;

  const getTasks = async (subjectTitle, themeTitle, taskYear, email) => {
    try {
      const response = await fetch('/api/tasks/get-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjectTitle, themeTitle, taskYear, email }),
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
    }
  };

  useEffect(() => {
    if (taskYear) {
      getTasks(subjectTitle, themeTitle, taskYear, email);
    }
  }, [subjectTitle, themeTitle, taskYear, email]);

  useEffect(() => {
    if (taskArray.length > 0) {
      setUserAnswers(Array(taskArray[currentTaskIndex].answers.length).fill(''));
    }
  }, [taskArray, currentTaskIndex]);

  const goToPreviousTask = () => {
    setUserAnswers([]);
    setCurrentTaskIndex(prevIndex => Math.max(0, prevIndex - 1));
    setButtonMessage('')
  };

  const goToNextTask = () => {
    setUserAnswers([]);
    setCurrentTaskIndex(prevIndex => Math.min(taskArray.length - 1, prevIndex + 1));
    setButtonMessage('')
  };

  var currentTask = taskArray[currentTaskIndex];

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = { ...newAnswers[index], answer: event.target.value };
    setUserAnswers(newAnswers);
};

  const handleCheckAnswers = async (email, currentTaskId) => {
    const updatedUserAnswers = userAnswers.map((userAnswer, index) => {
      const correctAnswers = currentTask.answers[index].answer;
      const isCorrect = correctAnswers.includes(userAnswer.answer);
      return { ...userAnswer, answer: userAnswer.answer, isCorrect: isCorrect };
    });

    const allCorrect = updatedUserAnswers.every(answer => answer.isCorrect);
    if(allCorrect){
      setIsLoading(true)
      try {
        const response = await fetch('/api/tasks/set-task-done', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentTaskId, email }),
        });
  
        if (response.ok) {
          setIsLoading(false)
          setButtonMessage('Ответ сохранен')
          currentTask.isDone = true
        } else {
          const data = await response.json();
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Ошибка при получении списка тем:', error);
        setIsLoading(false)
        setButtonMessage('Попробуйте снова')
      }
    }
  
    setUserAnswers(updatedUserAnswers);
};

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
            {currentTask && currentTask.answers.map((answer, index) => (
              <div key={`${currentTaskIndex}-${index}`} className={`answer-task-container`}>
                <p>{answer.answerText} ({answer.answer[0]})</p>
                <input 
                  type="text" 
                  value={userAnswers[index]?.answer} 
                  onChange={(event) => handleAnswerChange(index, event)} 
                  className={`${userAnswers[index]?.isCorrect ? 'correct' : userAnswers[index]?.isCorrect === false ? 'incorrect' : ''}`}
                />
              </div>
            ))}
            </div>
          </div>
        )}
        <div className='buttons-task-container'>
          {currentTaskIndex > 0 && <img className='previous-task-icon' src="/icons/arrow.png" alt="Exit Icon" title="Предыдущее задание" onClick={goToPreviousTask} />}
          {currentTaskIndex < taskArray.length - 1 && <img className='next-task-icon' src="/icons/arrow.png" alt="Exit Icon" title="Следующее задание" onClick={goToNextTask} />}
          <button onClick={() => handleCheckAnswers(email, currentTask._id)}>{isLoading ? <SpinnerCircularFixed size={25} thickness={180} speed={138} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.5)" /> : buttonMessage ? buttonMessage : 'Проверить ответ'}</button>
        </div>
      </div>
    </div>
  );
}

export default Task;
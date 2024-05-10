import React from 'react';
import './main-plates.css';
import { useNavigate } from 'react-router-dom';

function MainPlates() {
  const navigate = useNavigate();

  const plates = [];

  const subject = [
    {title: 'Математика', color: '#b8ffc8'}, 
    {title: 'Эстонский язык', color: '#b8d5ff'}, 
    {title: 'Химия', color: '#fdffb8'}, 
    {title: 'Физика', color: '#e9b9ff'}, 
    {title: 'История', color: '#ffb8b8'}, 
    {title: 'Обществоведение', color: '#b8f2ff'}, 
  ]
  
  const handleSubject = (subjectTitle) => {
    navigate(`/themes/${subjectTitle}/Полные%20экзамены`);
  }
  
  for (let i = 0; i < subject.length; i++) {
    plates.push(
      <div className='plate-container' onClick={() => handleSubject(subject[i].title)}>
        <div className='plate' key={i} style={{ backgroundColor: subject[i].color }}>
          <p>{subject[i].title}</p>
        </div>
      </div>
    );
  }


  return (
    <div className='main-plates-container'>
      <h1>Выберите предмет, по которому хотите подготовиться к экзамену</h1>
      <div className='plates'>
          {plates}
      </div>
    </div>
  );
}

export default MainPlates;
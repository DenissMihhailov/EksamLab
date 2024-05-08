import React from 'react';
import './sidebar.css';

function Sidebar() {

    const themesArray = [
        {title: "Полные экзамены"},
        {title: "Тригонометрия"},
        {title: "Планиметрия"},
        {title: "Геометрия"},
        {title: "Задачи на проценты"},
        {title: "Теория вероятностей"},
        {title: "Фунции"},
    ]

    const themesLinks = []
      
      for (let i = 0; i < themesArray.length; i++) {
        themesLinks.push(
            <div className='sidebar-link'>{themesArray[i].title}</div>
      );
    }
  return (
    <div className='sidebar'>
      {themesLinks}
    </div>
  );
}

export default Sidebar;
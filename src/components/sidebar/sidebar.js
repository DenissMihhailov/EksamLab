import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar({ subjectTitle, themeTitle}) {
  const navigate = useNavigate();
  const [themesArray, setThemesArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const getThemesTitle = async (subjectTitle) => {
    try {
      const response = await fetch('/api/tasks/get-themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjectTitle }),
      });

      if (response.ok) {
        const themes = await response.json();
        themes.unshift({title: 'Полные экзамены'})
        setThemesArray(themes);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Ошибка при получении списка тем:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectTitle) {
      setLoading(true);
      getThemesTitle(subjectTitle);
    }
  }, [subjectTitle]);

  const themesLinks = themesArray.map((theme, index) => (
    <div className={`sidebar-link ${theme.title.includes(themeTitle) ? 'active' : ''}`} key={index} onClick={() => showTheme(theme.title)}>
      {theme.title}
    </div>
  ));


  const showTheme = (themeTitle) => {
    navigate(`/themes/${subjectTitle}/${themeTitle}`);
  }

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      {themesLinks}
    </div>
  );
}

export default Sidebar;


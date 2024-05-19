import React, {useState, useEffect} from 'react';
import './theme-subject.css';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar'
import TaskSubject from '../task-subject/task-subject'
import { jwtDecode } from 'jwt-decode';
import { SpinnerCircularFixed } from 'spinners-react';


function Theme() {
  const navigate = useNavigate();
  // const isLoggedIn = !!localStorage.getItem('accessToken');
  const [tasksYears, setTasksYears] = useState([]);
  const [themeStatistic, setThemeStatistic] = useState({});
  const [themeLink, setThemeLink] = useState({});
  const { subjectTitle, themeTitle, taskYear } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(taskYear);
  const [widthAfter, setWidthAfter] = useState(false);

  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const email = decodedToken.userEmail;

  if (taskYear !== selectedYear) {
    setSelectedYear(taskYear);
  }

  useEffect(() => {

    const getTasksYears = async (subjectTitle, themeTitle, email) => {
      try {
        const response = await fetch('/api/tasks/get-tasks-years-with-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subjectTitle, themeTitle, email }),
        });

        if (response.ok) {
          const { tasksYearsWithProgress, themeStatistic, link } = await response.json();
          setTasksYears(tasksYearsWithProgress);
          setThemeStatistic(themeStatistic);
          setThemeLink(link)
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
      }
    };

    if (themeTitle) {
      setLoading(true);
      getTasksYears(subjectTitle, themeTitle, email);
    }
  }, [subjectTitle, themeTitle, email, taskYear]);

  const showTasks = (year) => {
    navigate(`/themes/${subjectTitle}/${themeTitle}/${year}`)
  }

  let themeText;
  if (themeTitle === 'Полные экзамены') {
    themeText = `
      На этой странице вы можете выбрать конкретный год, в котором проводился государственный экзамен и прорешать его целиком. (Задания и их порядок повторяют реальные экзамены, проводимые в выбранном году)
      <split>
      Кроме того, выполнение заданий из конкретных тем (Например: Задание по тригонометрии 2022) автоматически засчитывает прогресс экзамена из года, откуда это задание было взято.
      <split>
      Вы можете видеть свой текущий прогресс по экзамену, по степени заполнения кнопки зеленым цветом.
    `;
  } else {
    themeText = `
      На этой странице вы можете увидеть года, в которых встречались задания по теме ${themeTitle.toLowerCase()}. Нажимая на кнопку с годом, вы можете приступить к выполнению задания. 
      <split>
      В случае успешного выполнения задания, у вас растет прогресс, отслеживая который вы можете понять, достаточно ли вы подготовились к теме или нет. 
      <split>
      Вы можете видеть свой текущий прогресс по экзамену, по степени заполнения кнопки зеленым цветом.
    `;
  }
  
  return (
    <div>
      <Sidebar subjectTitle={subjectTitle} themeTitle={themeTitle} />
      <div className='without-navbar-container'>
      {selectedYear ? (
        <TaskSubject subjectTitle={subjectTitle} themeTitle={themeTitle} taskYear={selectedYear} />
      ) : (              
        <div className='theme-container'>
          <h1>{themeTitle}</h1>
  
          <div className='theme-text-container'>
          {themeText.split('<split>').map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className='theme-text'>{paragraph}</p>
              <br />
            </React.Fragment>
          ))}
          <a href={themeLink}>{themeTitle === "Полные экзамены" ? "" : 'Рекомендованная литература по теме ' + themeTitle.toLowerCase()  }</a>
          </div>
  
          <div className='progress-theme-container'>
            <p>Прогресс по теме</p>
            <div className='statistic-stick'><p>{loading ? <SpinnerCircularFixed size={20} thickness={150} speed={200} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.3)" /> : `${themeStatistic.procent}`}</p>
              <div className='color-statistic-stick' style={{ width: widthAfter ? themeStatistic.procent : '0%' }}></div>
            </div>
          </div>
  
          {loading ? (
            <div className='test-buttons-container'>
              {[...Array(4)].map((_, index) => (
              <div className='test-button-container'>
                <div className='test-button-skeleton'/>
              </div>
              ))}
            </div>
          ) : (  
            <div className='test-buttons-container'>
              {tasksYears.map((year, index) => (
                <div className='test-button-container' key={index} onClick={() => showTasks(year.year)}>
                  <div className='test-button' title={year.procent}>
                    <p>{year.year}</p>
                    <div className='color-test-button' style={{ width: year.procent }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
      </div>
    </div>
  )};

export default Theme;
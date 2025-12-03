import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Statistics() {
  const [technologies, setTechnologies] = useState([]);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const getStatusCount = (status) => {
    return technologies.filter(t => t.status === status).length;
  };

  const getCompletionPercentage = () => {
    const total = technologies.length;
    const completed = getStatusCount('completed');
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getMostCommonStatus = () => {
    const counts = {
      'not-started': getStatusCount('not-started'),
      'in-progress': getStatusCount('in-progress'),
      'completed': getStatusCount('completed')
    };
    
    const max = Math.max(...Object.values(counts));
    const status = Object.keys(counts).find(key => counts[key] === max);
    
    switch (status) {
      case 'not-started': return 'Не начатые технологии';
      case 'in-progress': return 'Технологии в процессе';
      case 'completed': return 'Завершенные технологии';
      default: return 'Нет данных';
    }
  };

  const getAverageCompletionTime = () => {
    // Здесь могла бы быть логика расчета среднего времени
    return '7 дней';
  };

  const getProgressData = () => {
    const total = technologies.length;
    const completed = getStatusCount('completed');
    const inProgress = getStatusCount('in-progress');
    const notStarted = getStatusCount('not-started');
    
    return [
      { label: 'Завершено', value: completed, color: '#27ae60' },
      { label: 'В процессе', value: inProgress, color: '#f39c12' },
      { label: 'Не начато', value: notStarted, color: '#e74c3c' }
    ];
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Статистика изучения</h1>
        <p className="page-subtitle">
          Анализ вашего прогресса в изучении технологий
        </p>
      </div>

      <div className="time-range-selector">
        <h3>Период анализа:</h3>
        <div className="range-options">
          {['week', 'month', 'quarter', 'all'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`range-btn ${timeRange === range ? 'active' : ''}`}
            >
              {range === 'week' ? 'Неделя' :
               range === 'month' ? 'Месяц' :
               range === 'quarter' ? 'Квартал' : 'Все время'}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card large">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Общий прогресс</h3>
            <div className="progress-circle">
              <div 
                className="circle-progress"
                style={{ 
                  background: `conic-gradient(#27ae60 ${getCompletionPercentage()}%, #e2e8f0 0%)` 
                }}
              >
                <span className="progress-percent">{getCompletionPercentage()}%</span>
              </div>
            </div>
            <p className="stat-description">
              {getCompletionPercentage() === 100 
                ? '🎉 Все технологии изучены!'
                : `Вы изучили ${getStatusCount('completed')} из ${technologies.length} технологий`}
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Всего технологий</h3>
              <p className="stat-value">{technologies.length}</p>
              <p className="stat-label">в трекере</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Завершено</h3>
              <p className="stat-value">{getStatusCount('completed')}</p>
              <p className="stat-label">технологий</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <h3>В процессе</h3>
              <p className="stat-value">{getStatusCount('in-progress')}</p>
              <p className="stat-label">изучаются</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>Не начато</h3>
              <p className="stat-value">{getStatusCount('not-started')}</p>
              <p className="stat-label">ожидают</p>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-breakdown">
        <h2>Распределение по статусам</h2>
        <div className="progress-bars">
          {getProgressData().map(item => (
            <div key={item.label} className="progress-item">
              <div className="progress-header">
                <span className="progress-label">
                  <span 
                    className="color-dot" 
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.label}
                </span>
                <span className="progress-count">{item.value}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${technologies.length > 0 ? (item.value / technologies.length) * 100 : 0}%`,
                    backgroundColor: item.color
                  }}
                ></div>
              </div>
              <span className="progress-percentage">
                {technologies.length > 0 
                  ? Math.round((item.value / technologies.length) * 100) 
                  : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="insights-section">
        <h2>Аналитические выводы</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>енденция</h3>
            <p>Чаще всего технологии находятся в статусе: <strong>{getMostCommonStatus()}</strong></p>
          </div>
          <div className="insight-card">
            <h3>Скорость</h3>
            <p>Среднее время изучения технологии: <strong>{getAverageCompletionTime()}</strong></p>
          </div>
          <div className="insight-card">
            <h3>Рекомендации</h3>
            <p>
              {getStatusCount('not-started') > 3 
                ? 'Попробуйте начать изучение 1-2 технологий одновременно'
                : 'Отличный баланс! Продолжайте в том же духе'}
            </p>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <Link to="/technologies" className="btn btn-primary">
          Перейти к технологиям
        </Link>
        <Link to="/add-technology" className="btn btn-outline">
          Добавить еще
        </Link>
        <div className="last-updated">
          Данные обновлены: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
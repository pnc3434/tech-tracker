import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <div className="progress-header__content">
        <h2>Дорожная карта изучения технологий</h2>
        
        <div className="progress-header__stats">
          <div className="progress-stat">
            <span className="progress-stat__value">{total}</span>
            <span className="progress-stat__label">Всего</span>
          </div>
          <div className="progress-stat">
            <span className="progress-stat__value">{completed}</span>
            <span className="progress-stat__label">Изучено</span>
          </div>
          <div className="progress-stat">
            <span className="progress-stat__value">{inProgress}</span>
            <span className="progress-stat__label">В процессе</span>
          </div>
          <div className="progress-stat">
            <span className="progress-stat__value">{notStarted}</span>
            <span className="progress-stat__label">Не начато</span>
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-bar__fill" 
            style={{ width: `${completionPercentage}%` }}
          >
            <span className="progress-bar__percentage">{completionPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;
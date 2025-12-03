import React from 'react';
import './QuickActions.css';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  onRandomSelect,
  onResetData 
}) {
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="quick-actions__buttons">
        <button 
          className="quick-actions__button quick-actions__button--complete"
          onClick={onMarkAllCompleted}
          title="Отметить все технологии как изученные"
        >
          Отметить все как выполненные
        </button>
        <button 
          className="quick-actions__button quick-actions__button--reset"
          onClick={onResetAll}
          title="Сбросить статусы всех технологий"
        >
          Сбросить все статусы
        </button>
        <button 
          className="quick-actions__button quick-actions__button--random"
          onClick={onRandomSelect}
          title="Случайным образом изменить статус одной технологии"
        >
          Случайный выбор
        </button>
        <button 
          className="quick-actions__button quick-actions__button--danger"
          onClick={onResetData}
          title="Сбросить все данные к начальным значениям"
        >
          Сбросить все данные
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
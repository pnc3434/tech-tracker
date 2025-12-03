import React from 'react';
import './TechnologyFilter.css';

function TechnologyFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все технологии' },
    { id: 'not-started', label: 'Не начатые' },
    { id: 'in-progress', label: 'В процессе' },
    { id: 'completed', label: 'Завершенные' }
  ];

  return (
    <div className="technology-filter">
      <h3>Фильтр по статусу</h3>
      <div className="technology-filter__buttons">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`technology-filter__button ${
              activeFilter === filter.id ? 'technology-filter__button--active' : ''
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TechnologyFilter;
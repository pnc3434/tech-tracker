import { Link } from 'react-router-dom';
import { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import TechnologySearch from '../components/TechnologySearch';
import TechnologyFilter from '../components/TechnologyFilter';
import './Pages.css';

function Technologies({ technologies, onStatusChange }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter !== 'all' && tech.status !== activeFilter) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query) ||
        (tech.notes && tech.notes.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const getStatusCount = (status) => {
    return technologies.filter(t => t.status === status).length;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <p className="page-subtitle">
          Управляйте и отслеживайте прогресс изучения технологий
        </p>
      </div>

      <TechnologySearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultsCount={filteredTechnologies.length}
        totalCount={technologies.length}
      />

      <TechnologyFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="status-overview">
        <div className="status-item">
          <span className="status-badge not-started"></span>
          <span>Не начато: {getStatusCount('not-started')}</span>
        </div>
        <div className="status-item">
          <span className="status-badge in-progress"></span>
          <span>В процессе: {getStatusCount('in-progress')}</span>
        </div>
        <div className="status-item">
          <span className="status-badge completed"></span>
          <span>Завершено: {getStatusCount('completed')}</span>
        </div>
      </div>

      {filteredTechnologies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>Технологии не найдены</h3>
          <p>
            {searchQuery || activeFilter !== 'all' 
              ? 'Попробуйте изменить поисковый запрос или фильтр'
              : 'У вас пока нет добавленных технологий'}
          </p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      ) : (
        <>
          <div className="technologies-grid">
            {filteredTechnologies.map(tech => (
              <div key={tech.id} className="technology-item">
                <TechnologyCard
                  id={tech.id}
                  title={tech.title}
                  description={tech.description}
                  status={tech.status}
                  onStatusChange={onStatusChange}
                />
                <div className="technology-actions">
                  <Link 
                    to={`/technology/${tech.id}`} 
                    className="btn-link"
                  >
                    Подробнее
                  </Link>
                  <span className="tech-id">ID: {tech.id}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="page-footer">
            <Link to="/add-technology" className="btn btn-primary">
              Добавить еще технологию
            </Link>
            <div className="footer-info">
              Показано {filteredTechnologies.length} из {technologies.length} технологий
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Technologies;
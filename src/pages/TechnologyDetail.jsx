import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Pages.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      const technologies = JSON.parse(saved);
      const tech = technologies.find(t => t.id === parseInt(techId));
      if (tech) {
        setTechnology(tech);
        setNotes(tech.notes || '');
      }
    }
  }, [techId]);

  const updateStatus = (newStatus) => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map(tech =>
        tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
      );
      localStorage.setItem('techTrackerData', JSON.stringify(updated));
      setTechnology({ ...technology, status: newStatus });
    }
  };

  const saveNotes = () => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map(tech =>
        tech.id === parseInt(techId) ? { ...tech, notes } : tech
      );
      localStorage.setItem('techTrackerData', JSON.stringify(updated));
      setTechnology({ ...technology, notes });
      setIsEditingNotes(false);
    }
  };

  const deleteTechnology = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      const saved = localStorage.getItem('techTrackerData');
      if (saved) {
        const technologies = JSON.parse(saved);
        const updated = technologies.filter(t => t.id !== parseInt(techId));
        localStorage.setItem('techTrackerData', JSON.stringify(updated));
        navigate('/technologies');
      }
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>🔍 Технология не найдена</h1>
        </div>
        <div className="not-found">
          <p>Технология с ID {techId} не существует.</p>
          <div className="action-buttons">
            <Link to="/technologies" className="btn">
              ← Назад к списку
            </Link>
            <Link to="/" className="btn btn-outline">
              На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'not-started': return 'Не начато';
      case 'in-progress': return 'В процессе';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'not-started': return '#e74c3c';
      case 'in-progress': return '#f39c12';
      case 'completed': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>🔬 {technology.title}</h1>
        <p className="page-subtitle">Детальная информация о технологии</p>
      </div>

      <div className="detail-container">
        <div className="detail-main">
          <div className="detail-card">
            <div className="detail-header">
              <div className="detail-title-section">
                <h2>{technology.title}</h2>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(technology.status) }}
                >
                  {getStatusText(technology.status)}
                </span>
              </div>
              
              <div className="detail-meta">
                <span>ID: {technology.id}</span>
                <span>•</span>
                <span>Добавлено: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Описание</h3>
              <p className="description-text">{technology.description}</p>
            </div>

            <div className="detail-section">
              <h3>Статус изучения</h3>
              <div className="status-controls">
                <button
                  onClick={() => updateStatus('not-started')}
                  className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
                  style={{ '--status-color': '#e74c3c' }}
                >
                  Не начато
                </button>
                <button
                  onClick={() => updateStatus('in-progress')}
                  className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
                  style={{ '--status-color': '#f39c12' }}
                >
                  В процессе
                </button>
                <button
                  onClick={() => updateStatus('completed')}
                  className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
                  style={{ '--status-color': '#27ae60' }}
                >
                  Завершено
                </button>
              </div>
            </div>

            <div className="detail-section">
              <h3>Мои заметки</h3>
              {isEditingNotes ? (
                <div className="notes-editor">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Добавьте свои заметки, мысли, идеи..."
                    rows="4"
                    className="notes-textarea"
                  />
                  <div className="notes-actions">
                    <button onClick={saveNotes} className="btn btn-primary">
                      Сохранить
                    </button>
                    <button onClick={() => setIsEditingNotes(false)} className="btn btn-outline">
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="notes-display">
                  {technology.notes ? (
                    <>
                      <p className="notes-text">{technology.notes}</p>
                      <button 
                        onClick={() => setIsEditingNotes(true)} 
                        className="btn-link"
                      >
                        ✏️ Редактировать заметки
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="notes-empty">Заметок пока нет</p>
                      <button 
                        onClick={() => setIsEditingNotes(true)} 
                        className="btn-link"
                      >
                        Добавить заметки
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="sidebar-card">
            <h3>Быстрые действия</h3>
            <div className="sidebar-actions">
              <Link to="/technologies" className="sidebar-btn">
                К списку технологий
              </Link>
              <Link to="/add-technology" className="sidebar-btn">
                Добавить новую
              </Link>
              <Link to="/statistics" className="sidebar-btn">
                Посмотреть статистику
              </Link>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Информация</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Статус:</span>
                <span className="info-value">{getStatusText(technology.status)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ID технологии:</span>
                <span className="info-value">{technology.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Дата создания:</span>
                <span className="info-value">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Длина заметок:</span>
                <span className="info-value">{technology.notes ? technology.notes.length : 0} симв.</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card danger-zone">
            <h3>Опасная зона</h3>
            <p className="danger-text">
              Удаление технологии нельзя отменить. Все данные будут потеряны.
            </p>
            <button onClick={deleteTechnology} className="btn btn-danger">
              Удалить технологию
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;
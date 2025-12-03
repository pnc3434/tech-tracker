import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function AddTechnology() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно быть не менее 3 символов';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Описание должно быть не менее 10 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Получаем существующие технологии
    const saved = localStorage.getItem('techTrackerData');
    const existing = saved ? JSON.parse(saved) : [];
    
    // Генерируем новый ID
    const newId = existing.length > 0 
      ? Math.max(...existing.map(t => t.id)) + 1 
      : 1;
    
    // Создаем новую технологию
    const newTechnology = {
      id: newId,
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    // Добавляем к существующим
    const updated = [...existing, newTechnology];
    
    // Сохраняем
    localStorage.setItem('techTrackerData', JSON.stringify(updated));
    
    // Показываем сообщение и перенаправляем
    alert(`Технология "${formData.title}" успешно добавлена!`);
    navigate('/technologies');
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      status: 'not-started',
      notes: ''
    });
    setErrors({});
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить новую технологию</h1>
        <p className="page-subtitle">
          Заполните форму, чтобы добавить новую технологию для изучения
        </p>
      </div>

      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-section">
          <h2>Основная информация</h2>
          
          <div className="form-group">
            <label htmlFor="title">
              Название технологии *
              <span className="form-hint">Например: "React Hooks", "Node.js Express"</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введите название технологии"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Описание *
              <span className="form-hint">Опишите, что это за технология и что вы планируете изучить</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Опишите технологию..."
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>

        <div className="form-section">
          <h2>Настройки изучения</h2>
          
          <div className="form-group">
            <label htmlFor="status">Начальный статус *</label>
            <div className="status-options">
              {[
                { value: 'not-started', label: 'Не начато', color: '#e74c3c' },
                { value: 'in-progress', label: 'В процессе', color: '#f39c12' },
                { value: 'completed', label: 'Завершено', color: '#27ae60' }
              ].map(option => (
                <label key={option.value} className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={formData.status === option.value}
                    onChange={handleChange}
                  />
                  <span 
                    className="status-option-label"
                    style={{ '--option-color': option.color }}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              Предварительные заметки
              <span className="form-hint">Дополнительные мысли, цели или ресурсы</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Добавьте заметки, если есть..."
              rows="3"
            />
            <div className="char-count">
              {formData.notes.length}/500 символов
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Сохранить технологию
          </button>
          <button type="button" onClick={handleReset} className="btn btn-outline">
            Очистить форму
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/technologies')}
            className="btn btn-secondary"
          >
            Отмена
          </button>
        </div>

        <div className="form-help">
          <h3>Советы по заполнению</h3>
          <ul>
            <li>Давайте технологии конкретные и понятные названия</li>
            <li>В описании укажите, что именно вы планируете изучить</li>
            <li>Начинайте с реалистичных целей и простых технологий</li>
            <li>Используйте заметки для сохранения полезных ресурсов</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      notifications: true,
      autoSave: true,
      language: 'ru',
      fontSize: 'medium'
    };
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleChange = (name, value) => {
    const updated = { ...settings, [name]: value };
    setSettings(updated);
    localStorage.setItem('appSettings', JSON.stringify(updated));
  };

  const handleResetData = () => {
    if (window.confirm('Вы уверены? Все данные будут удалены безвозвратно.')) {
      localStorage.removeItem('techTrackerData');
      alert('Все данные удалены. Страница будет перезагружена.');
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = localStorage.getItem('techTrackerData');
    const blob = new Blob([data || '[]'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tech-tracker-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem('techTrackerData', JSON.stringify(data));
        alert('Данные успешно импортированы! Страница будет перезагружена.');
        window.location.reload();
      } catch (error) {
        alert('Ошибка при импорте данных. Проверьте формат файла.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      notifications: true,
      autoSave: true,
      language: 'ru',
      fontSize: 'medium'
    };
    setSettings(defaultSettings);
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    setShowResetConfirm(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Настройки приложения</h1>
        <p className="page-subtitle">
          Настройте внешний вид и поведение трекера технологий
        </p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h2>Внешний вид</h2>
          
          <div className="setting-item">
            <label>
              <span className="setting-label">Тема оформления</span>
              <span className="setting-description">Выберите светлую или темную тему</span>
            </label>
            <div className="setting-control">
              <select 
                value={settings.theme} 
                onChange={(e) => handleChange('theme', e.target.value)}
                className="setting-select"
              >
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
                <option value="auto">Автоматически</option>
              </select>
            </div>
          </div>

          <div className="setting-item">
            <label>
              <span className="setting-label">Размер шрифта</span>
              <span className="setting-description">Настройте размер текста для комфортного чтения</span>
            </label>
            <div className="setting-control">
              <div className="font-size-options">
                {[
                  { value: 'small', label: 'Маленький' },
                  { value: 'medium', label: 'Средний' },
                  { value: 'large', label: 'Большой' }
                ].map(option => (
                  <label key={option.value} className="font-size-option">
                    <input
                      type="radio"
                      name="fontSize"
                      value={option.value}
                      checked={settings.fontSize === option.value}
                      onChange={(e) => handleChange('fontSize', e.target.value)}
                    />
                    <span className="option-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Уведомления и сохранение</h2>
          
          <div className="setting-item">
            <label className="switch-label">
              <div className="switch-text">
                <span className="setting-label">Автосохранение</span>
                <span className="setting-description">Автоматически сохранять изменения</span>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleChange('autoSave', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </label>
          </div>

          <div className="setting-item">
            <label className="switch-label">
              <div className="switch-text">
                <span className="setting-label">Уведомления</span>
                <span className="setting-description">Показывать уведомления о прогрессе</span>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleChange('notifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </label>
          </div>

          <div className="setting-item">
            <label>
              <span className="setting-label">Язык интерфейса</span>
              <span className="setting-description">Выберите предпочитаемый язык</span>
            </label>
            <div className="setting-control">
              <select 
                value={settings.language} 
                onChange={(e) => handleChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Управление данными</h2>
          
          <div className="setting-item">
            <label>
              <span className="setting-label">Экспорт данных</span>
              <span className="setting-description">Скачайте резервную копию всех данных</span>
            </label>
            <div className="setting-control">
              <button onClick={exportData} className="btn btn-outline">
                Экспортировать данные
              </button>
            </div>
          </div>

          <div className="setting-item">
            <label>
              <span className="setting-label">Импорт данных</span>
              <span className="setting-description">Восстановите данные из файла</span>
            </label>
            <div className="setting-control">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                id="import-file"
                className="file-input"
              />
              <label htmlFor="import-file" className="btn btn-outline">
                Выбрать файл для импорта
              </label>
            </div>
          </div>

          <div className="setting-item">
            <label>
              <span className="setting-label">Сброс всех данных</span>
              <span className="setting-description danger">Это действие нельзя отменить!</span>
            </label>
            <div className="setting-control">
              <button onClick={handleResetData} className="btn btn-danger">
                🗑️ Удалить все данные
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Сброс настроек</h2>
          
          <div className="setting-item">
            <label>
              <span className="setting-label">Восстановить настройки по умолчанию</span>
              <span className="setting-description">Вернуть все настройки к исходным значениям</span>
            </label>
            <div className="setting-control">
              {showResetConfirm ? (
                <div className="confirm-reset">
                  <p>Вы уверены?</p>
                  <div className="confirm-buttons">
                    <button onClick={handleResetSettings} className="btn btn-danger">
                      Да, сбросить
                    </button>
                    <button onClick={() => setShowResetConfirm(false)} className="btn btn-outline">
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowResetConfirm(true)} className="btn btn-warning">
                  Сбросить настройки
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <div className="app-info">
          <h3>ℹ️ Информация о приложении</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Версия:</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">React Router:</span>
              <span className="info-value">v6</span>
            </div>
            <div className="info-item">
              <span className="info-label">Технологий в базе:</span>
              <span className="info-value">
                {JSON.parse(localStorage.getItem('techTrackerData') || '[]').length}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Размер хранилища:</span>
              <span className="info-value">
                {Math.round((localStorage.getItem('techTrackerData')?.length || 0) / 1024)} KB
              </span>
            </div>
          </div>
        </div>

        <div className="footer-actions">
          <button onClick={() => navigate('/')} className="btn btn-primary">
            ← На главную
          </button>
          <button onClick={() => navigate('/technologies')} className="btn btn-outline">
            К технологиям
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
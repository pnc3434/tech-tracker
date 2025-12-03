import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';
import ProgressHeader from '../components/ProgressHeader';
import WindowSizeTracker from '../components/WindowSizeTracker';
import TaskList from '../TaskList';
import './Pages.css';

function Home({ technologies, isLoggedIn }) {
  const completedCount = technologies.filter(t => t.status === 'completed').length;
  const totalCount = technologies.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добро пожаловать в Трекер процессов</h1>
        <p className="page-subtitle">Отслеживайте свой прогресс в изучении современных технологий</p>
      </div>

      {isLoggedIn ? (
        <>
          <UserCard
            name="Иван Иванов"
            role="Администратор"
            avatarUrl="https://i.pinimg.com/736x/3f/4e/0c/3f4e0c241e60fb3fc28b3289122b626d.jpg"
            isOnline={true}
          />

          <WindowSizeTracker />

          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>Технологий в изучении</h3>
                <p className="stat-value">{totalCount}</p>
                <Link to="/technologies" className="stat-link">
                  Посмотреть все →
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Прогресс изучения</h3>
                <p className="stat-value">{progress}%</p>
                <Link to="/statistics" className="stat-link">
                  Детальная статистика →
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>Цели на неделю</h3>
                <p className="stat-value">{Math.max(0, 3 - completedCount)} из 3</p>
                <Link to="/add-technology" className="stat-link">
                  Добавить цель →
                </Link>
              </div>
            </div>
          </div>

          <ProgressHeader technologies={technologies} />

          <div className="quick-actions-section">
            <h2>Быстрый старт</h2>
            <div className="action-buttons">
              <Link to="/add-technology" className="action-btn primary">
                Добавить новую процесс
              </Link>
              <Link to="/technologies" className="action-btn secondary">
                Просмотреть все процесс
              </Link>
              <Link to="/settings" className="action-btn outline">
                Настроить приложение
              </Link>
            </div>
          </div>

          <TaskList />
        </>
      ) : (
        <div className="auth-required">
          <div className="auth-message">
            <h2>Требуется авторизация</h2>
            <p>Для доступа к функциям трекера технологий необходимо войти в систему.</p>
            <div className="auth-actions">
              <Link to="/login" className="btn btn-primary">
                Войти в систему
              </Link>
              <div className="demo-credentials">
                <p><strong>Тестовые данные:</strong></p>
                <p>Логин: <code>admin</code></p>
                <p>Пароль: <code>password</code></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
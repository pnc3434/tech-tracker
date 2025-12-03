import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>Трекер процессов</h2>
        </Link>
      </div>
      
      {isLoggedIn ? (
        <>
          <ul className="nav-menu">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/technologies" className={isActive('/technologies') ? 'active' : ''}>
                Все процессы
              </Link>
            </li>
            <li>
              <Link to="/add-technology" className={isActive('/add-technology') ? 'active' : ''}>
                Добавить
              </Link>
            </li>
            <li>
              <Link to="/statistics" className={isActive('/statistics') ? 'active' : ''}>
                Статистика
              </Link>
            </li>
            <li>
              <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
                Настройки
              </Link>
            </li>
          </ul>

          <div className="nav-info">
            <span className="nav-hint">👤 {username}</span>
            <button onClick={onLogout} className="btn btn-outline logout-btn">
              Выйти
            </button>
          </div>
        </>
      ) : (
        <>
          <ul className="nav-menu">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                Войти
              </Link>
            </li>
          </ul>
          <div className="nav-info">
            <span className="nav-hint">Не авторизован</span>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;
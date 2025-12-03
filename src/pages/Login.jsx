import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'password') {
      onLogin(username);
    } else {
      alert('Неверные данные для входа. Используйте: admin / password');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Вход в систему</h1>
        <p className="page-subtitle">
          Авторизуйтесь для доступа к функциям трекера технологий
        </p>
      </div>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              className="login-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Войти
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="btn btn-outline"
            >
              Отмена
            </button>
          </div>

          <div className="login-hint">
            <p><strong>Тестовые данные для входа:</strong></p>
            <p>Логин: <code>admin</code></p>
            <p>Пароль: <code>password</code></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
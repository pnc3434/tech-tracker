import React from 'react';
import './UserCard.css';

function UserCard({ name, role, avatarUrl, isOnline }) {
  return (
    <div className="user-card">
      <div className="avatar-section">
        <img src={avatarUrl} alt={`Аватар ${name}`} />
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '● онлайн' : '○ офлайн'}
        </div>
      </div>
      <div className="user-info">
        <h3>Жуков Максим</h3>
        <p className="role">{role}</p>
        <p className="welcome">Добро пожаловать в систему управления обучением</p>
      </div>
    </div>
  );
}

export default UserCard;